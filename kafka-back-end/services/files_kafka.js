/**
 * Created by ManaliJain on 10/30/17.
 */
var mongo = require("./mongoConnector");
var mongodb = require('mongodb');
var mongoLogin = "mongodb://localhost:27017/Dropboxuser";
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var moment = require('moment');

function handleFileRequest(req,api, callback) {

    console.log('api is', api);
    switch (api) {
        case "insertFile" :
            insertFile(req, function (err, jsonResponse) {
                callback(null, jsonResponse);
            });
            return;

        case "insertFileGroupAndDIR" :
            insertFileGroupAndDIR(req, function (err, jsonResponse) {
                callback(null, jsonResponse);
            });
            return;

        case "uploadFileInDir" :
            uploadFileInDir(req, function (err, jsonResponse) {
                callback(null, jsonResponse);
            });
            return;

        case "uploadFileInGroup" :
            uploadFileInGroup(req, function (err, jsonResponse) {
                callback(null, jsonResponse);
            });
            return;
    }
}
exports.handleFileRequest = handleFileRequest;

function insertFile(req,callback){
    let file_created_timestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    mongo.connect(mongoLogin, function (mongoConn) {
        console.log('Connected to mongo at: ' + mongoLogin);

        let collection = mongoConn.collection('files');
        let payload = {
            "user_uuid" : [req.user_uuid],
            "dir_name" : '',
            "dir_uuid" : '',
            "dir_created": '',
            "star_id" : '0',
            "owner_uuid" : req.user_uuid,
            "filesArray" : [{
                "file_uuid": req.uuidv4,
                "file_created" : file_created_timestamp,
                "file_name": req.file.originalname,
                "file_type": req.file.mimetype,
                "file_path" : req.filePath
            }]
        }
        collection.insert(payload, function (err, result) {
            // console.log("file result is", result);
            if (err) {
                throw err;
            }
            else {
                callback(null, {});
            }
        });
        mongo.releaseConnection(mongoConn);
    });
}

function insertFileGroupAndDIR(req, callback) {
    var file_creation_timestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    mongo.connect(mongoLogin, function (mongoConn) {
        console.log('Connected to mongo at: ' + mongoLogin);

        let collection = mongoConn.collection('filesTemp');
        console.log("req received is",req.file);
        console.log("file received is",req.file);
        let payload = {
            "file_uuid": req.file_uuid,
            "file_created": file_creation_timestamp,
            "file_name": req.file.originalname,
            "file_type": req.file.mimetype,
            "file_path": req.filePath,
            "owner_uuid": req.user_uuid
        }
        console.log("payload received is",payload);
        collection.insert(payload, function (err, result) {
            // console.log("file result is", result);
            if (err) {
                throw err;
            }
            else {
                callback(null, {});
            }
        });
        mongo.releaseConnection(mongoConn);
    });
}

function uploadFileInDir(req,callback){
    let jsonResponse = {};

    mongo.connect(mongoLogin, function(mongoConn){
        console.log('Connected to mongo at: ' + mongoLogin);
        let collectionFile = mongoConn.collection('filesTemp');
        let collection = mongoConn.collection('files');

        collectionFile.findOne({file_uuid: req.file_uuid}, function(err, result){
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
                var msg = "Upload Error";
                jsonResponse = {
                    "statusCode": 300,
                    "result": "Error",
                    "message": msg
                };
                // res.send(jsonResponse);
                callback(null, jsonResponse);
            } else if (result) {
                collection.update({ "_id" : new mongodb.ObjectID(req._id)},
                    {$push:{"filesArray": result }}, function (err, result1) {
                        console.log("result is", result1);
                        if (err) {
                            var msg = "Upload Error";
                            jsonResponse = {
                                "statusCode": 500,
                                "result": "Error",
                                "message": msg
                            };
                            // res.send(jsonResponse);
                            callback(null, jsonResponse);
                        } else {
                            if(result1.result.nModified > 0){
                                jsonResponse = {
                                    "statusCode": 201,
                                    "result": "Success",
                                    "msg" : ''
                                };
                                // res.send(jsonResponse);
                                callback(null, jsonResponse);
                            } else {
                                var msg = "Upload Error";
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
        mongo.releaseConnection(mongoConn);
    });
}

function uploadFileInGroup(req,callback){
    let jsonResponse = {};

    mongo.connect(mongoLogin, function(mongoConn){
        console.log('Connected to mongo at: ' + mongoLogin);
        let collectionFile = mongoConn.collection('filesTemp');
        let collection = mongoConn.collection('groups');

        collectionFile.findOne({file_uuid: req.file_uuid}, function(err, result){
            if(err){
                var msg = "Error Occured. upload once again";
                jsonResponse = {
                    "statusCode": 500,
                    "result": "Error",
                    "message": msg
                };
                // res.send(jsonResponse);
                callback(null, jsonResponse);
            }
            else if (result === null) {
                var msg = "Upload Error";
                jsonResponse = {
                    "statusCode": 500,
                    "result": "Error",
                    "message": msg
                };
                // res.send(jsonResponse);
                callback(null, jsonResponse);
            } else if (result) {
                collection.update({ "_id" : new mongodb.ObjectID(req._id)},
                    {$push:{"filesArray": result }}, function (err, result1) {
                        if (err) {
                            var msg = "Error Occured. upload once again";
                            jsonResponse = {
                                "statusCode": 500,
                                "result": "Error",
                                "message": msg
                            };
                            // res.send(jsonResponse);
                            callback(null, jsonResponse);
                        } else {
                            if(result1.result.nModified > 0){
                                jsonResponse = {
                                    "statusCode": 201,
                                    "result": "Success",
                                    "msg" : ''
                                };
                                // res.send(jsonResponse);
                                callback(null, jsonResponse);
                            } else {
                                var msg = "Upload Error";
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
        mongo.releaseConnection(mongoConn);
    });
}