/**
 * Created by ManaliJain on 10/31/17.
 */

var mongo = require("./mongoConnector");
var mongodb = require('mongodb');
var mongoLogin = "mongodb://localhost:27017/Dropboxuser";
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var uuid = require('uuid/v4');
var moment = require('moment');


function handleGroupRequest(req,api, callback){

    console.log('api is',api);
    switch(api) {
        case "createGroup" :
            createGroup(req,function(err,jsonResponse){
                callback(null, jsonResponse);
                return;
            });
            return;

        case "getGroup" :
            getGroup(req,function(err,jsonResponse){
                callback(null, jsonResponse);
                return;
            });
            return;

        case "addMember" :
            addMember(req,function(err,jsonResponse){
                callback(null, jsonResponse);
                return;
            });
            return;

        case "deleteMember" :
            deleteMember(req,function(err,jsonResponse){
                callback(null, jsonResponse);
                return;
            });
            return;

        case "deleteFileFromGroup" :
            deleteFileFromGroup(req,function(err,jsonResponse){
                callback(null, jsonResponse);
            });
            return;

        case "deleteGroup" :
            deleteGroup(req,function(err,jsonResponse){
                callback(null, jsonResponse);
            });
            return;
    }
}

exports.handleGroupRequest = handleGroupRequest;

function createGroup(req,callback){
    let jsonResponse = {};
    let uuidv4 = uuid();
    console.log(uuidv4);

    mongo.connect(mongoLogin, function (mongoConn) {
        console.log('Connected to mongo at: ' + mongoLogin);

        let collection = mongoConn.collection('groups');
        let payload = {
            "group_uuid": uuidv4,
            "group_name": req.groupName,
            "creator_uuid": req.user_uuid,
            "creator_name": req.user_name,
            "membersArray": [{
                "member_uuid": req.user_uuid,
                "member_name": req.user_name
            }],
            "filesArray": []
        };

        collection.insert(payload, function (err, result) {
            // console.log("file result is", result);
            if (err) {
                var msg = "Error Occured";
                jsonResponse = {
                    "statusCode": 500,
                    "result": "Error",
                    "message": msg
                };
                // res.send(jsonResponse);
                callback(null, jsonResponse);
            } else if(result) {
                var msg = "Group created";
                jsonResponse = {
                    "statusCode": 201,
                    "result": "success",
                    "message": msg
                };
                // res.send(jsonResponse);
                callback(null, jsonResponse);
            } else {
                var msg = "Error";
                jsonResponse = {
                    "statusCode": 400,
                    "result": "Error",
                    "message": msg
                };
                // res.send(jsonResponse);
                callback(null, jsonResponse);
            }
        });
    });
}

function getGroup(req,callback){

    let jsonResponse = {};

    let groups = [];
    mongo.connect(mongoLogin, function (mongoConn) {
        console.log('Connected to mongo at: ' + mongoLogin);

        let collection = mongoConn.collection('groups');
        collection.find({'membersArray.member_uuid':req.user_uuid}).toArray(function(err, result) {
            console.log("group result is", result);
            if (err) {
                var msg = "Error Occured";
                jsonResponse = {
                    "statusCode": 500,
                    "result": "Error",
                    "message": msg
                };
                // res.send(jsonResponse);
                callback(null, jsonResponse);
            } else if (result !== null) {
                var msg = "";
                jsonResponse = {
                    "statusCode": 201,
                    "result": "Success",
                    "group": result,
                    "message": ''
                };
                console.log("final group", groups);
                // res.send(jsonResponse);
                callback(null, jsonResponse);
            } else {
                var msg = "";
                jsonResponse = {
                    "statusCode": 201,
                    "result": "success",
                    "group": groups,
                    "message": msg
                };
                // res.send(jsonResponse);
                callback(null, jsonResponse);
            }
        });
    });
}

function addMember(req,callback){
    let jsonResponse = {};

    mongo.connect(mongoLogin, function(){
        console.log('Connected to mongo at: ' + mongoLogin);
        let collectionGroup = mongo.collection('groups');
        let collection = mongo.collection('user');

        collection.findOne({email: req.addToEmail}, function(err, result){
            console.log("result is123",result);
            if(err){
                var msg = "Error Occured";
                jsonResponse = {
                    "statusCode": 500,
                    "result": "Error",
                    "message": msg
                };
                // res.send(jsonResponse);
                callback(null, jsonResponse);
            }
            else if (result === null) {
                var msg = "User is not available in Dropbox";
                jsonResponse = {
                    "statusCode": 300,
                    "result": "Error",
                    "message": msg
                };
                // res.send(jsonResponse);
                callback(null, jsonResponse);
            } else if (result) {
                let name = result.firstname + " " + result.lastname;
                var member= {
                    "member_uuid": result.user_uuid,
                    "member_name": name
                }
                collectionGroup.update({ "_id" : new mongodb.ObjectID(req._id)},
                    {$push:{"membersArray": member }}, function (err, result1) {
                        console.log("result is", result1);
                        if (err) {
                            var msg = "Add member failed";
                            jsonResponse = {
                                "statusCode": 500,
                                "result": "Error",
                                "message": msg
                            };
                            // res.send(jsonResponse);
                            callback(null, jsonResponse);
                        } else {
                            if(result1.result.nModified > 0){
                                var msg = "Add member Success";
                                jsonResponse = {
                                    "statusCode": 201,
                                    "result": "Error",
                                    "message": msg
                                };
                                // res.send(jsonResponse);
                                callback(null, jsonResponse);
                            } else {
                                var msg = "Error";
                                jsonResponse = {
                                    "statusCode": 500,
                                    "result": "Error",
                                    "message": msg
                                };
                                // res.send(jsonResponse);
                                callback(null, jsonResponse);
                            }
                        }
                    });
            }
        });
    });
}

function deleteMember(req,callback){
    let jsonResponse = {};

    mongo.connect(mongoLogin, function (mongoConn) {
        console.log('Connected to mongo at: ' + mongoLogin);

        let collection = mongoConn.collection('groups');

        collection.update({"_id" : new mongodb.ObjectID(req._id)},
            { $pull: { membersArray: {member_uuid : req.delete_uuid }}}, function (err, result) {
                if (err) {
                    let msg = "Error Occured. delete once again";
                    jsonResponse = {
                        "statusCode": 500,
                        "result": "Error",
                        "message": msg
                    };
                    // res.send(jsonResponse);
                    callback(null, jsonResponse);
                } else {
                    if (result!==null) {
                        let msg = "Member Deleted";
                        jsonResponse = {
                            "statusCode": 201,
                            "result": "Success",
                            "data" : result,
                            "message": msg
                        };
                        // res.send(jsonResponse);
                        callback(null, jsonResponse);
                    } else {
                        let msg = "Error Occured";
                        jsonResponse = {
                            "statusCode": 400,
                            "result": "Error",
                            "message": msg
                        };
                        // res.send(jsonResponse);
                        callback(null, jsonResponse);
                    }
                }
            });
    })
}

function deleteFileFromGroup(req,callback){
    let jsonResponse = {};

    mongo.connect(mongoLogin, function (mongoConn) {
        console.log('Connected to mongo at: ' + mongoLogin);

        let collection = mongoConn.collection('groups');

        collection.update({"_id": new mongodb.ObjectID(req._id)},
            {$pull: {filesArray: {file_uuid: req.file_uuid}}}, function (err, result) {
                // console.log("file result is", result);
                if (err) {
                    let msg = "Error Occured. delete once again";
                    jsonResponse = {
                        "statusCode": 500,
                        "result": "Error",
                        "message": msg
                    };
                    // res.send(jsonResponse);
                    callback(null, jsonResponse);
                } else {
                    if (result !== null) {
                        let msg = "File deleted";
                        jsonResponse = {
                            "statusCode": 201,
                            "result": "Success",
                            "data": result,
                            "message": msg
                        };
                        console.log(jsonResponse)
                        // res.send(jsonResponse);
                        callback(null, jsonResponse);
                    } else {
                        let msg = "Error Occured";
                        jsonResponse = {
                            "statusCode": 400,
                            "result": "Error",
                            "message": msg
                        };
                        // res.send(jsonResponse);
                        callback(null, jsonResponse);
                    }
                }
            });
    });
}

function deleteGroup(req,callback){
    let jsonResponse = {};

    mongo.connect(mongoLogin, function (mongoConn) {
        console.log('Connected to mongo at: ' + mongoLogin);

        let collection = mongoConn.collection('groups');

        collection.remove({ "_id" : new mongodb.ObjectID(req._id)}, function (err, result) {
            if (err) {
                let msg = "Error Occured. Delete once again";
                jsonResponse = {
                    "statusCode": 500,
                    "result": "Error",
                    "message": msg
                };
                // res.send(jsonResponse);
                callback(null, jsonResponse);
            } else {
                if (result!==null) {
                    jsonResponse = {
                        "statusCode": 201,
                        "result": "Success",
                        "msg": 'Group Successfully deleted'
                    };
                    // res.send(jsonResponse);
                    callback(null, jsonResponse);
                } else {
                    let msg = "Failed";
                    jsonResponse = {
                        "statusCode": 500,
                        "result": "Error",
                        "msg": msg
                    };
                    // res.send(jsonResponse);
                    callback(null, jsonResponse);
                }
            }
        });
    });
}