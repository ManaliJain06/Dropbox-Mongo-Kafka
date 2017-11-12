/**
 * Created by ManaliJain on 10/31/17.
 * This file handles all teh operations an a file or folder.. ie get all files/folder, create directory, delete
 * file/directory, share file/directory etc
 */


var mongo = require("./mongoConnector");
var mongodb = require('mongodb');
var mongoLogin = "mongodb://localhost:27017/Dropboxuser";
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var uuid = require('uuid/v4');
var moment = require('moment');

function handleDirRequest(req, api, callback) {

    console.log('api is', api);
    switch (api) {
        case "getFiles" :
            getFiles(req, function (err, jsonResponse) {
                callback(null, jsonResponse);
                return;
            });
            return;

        case "createDirectory" :
            createDirectory(req, function (err, jsonResponse) {
                callback(null, jsonResponse);
            });
            return;

        case "deleteFile" :
            deleteFile(req, function (err, jsonResponse) {
                callback(null, jsonResponse);
            });
            return;

        case "deleteDirectory" :
            deleteDirectory(req, function (err, jsonResponse) {
                callback(null, jsonResponse);
            });
            return;

        case "shareFile" :
            shareFile(req, function (err, jsonResponse) {
                callback(null, jsonResponse);
            });
            return;

        case "shareDirectory" :
            shareDirectory(req, function (err, jsonResponse) {
                callback(null, jsonResponse);
            });
            return;

        case "shareLink" :
            shareLink(req, function (err, jsonResponse) {
                callback(null, jsonResponse);
            });
            return;

        case "deleteFileInDir" :
            deleteFileInDir(req, function (err, jsonResponse) {
                callback(null, jsonResponse);
            });
            return;

        case "starDirFile" :
            starDirFile(req, function (err, jsonResponse) {
                callback(null, jsonResponse);
            });
            return;

    }
}

exports.handleDirRequest = handleDirRequest;

function getFiles(req,callback) {
    let jsonResponse = {};

    let files = [];
    mongo.connect(mongoLogin, function (mongoConn) {
        console.log('Connected to mongo at: ' + mongoLogin);

        let collection = mongoConn.collection('files');
        collection.find({'user_uuid': req.user_uuid}).toArray(function(err, result) {
            console.log("file result is", result);
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
                    "result": "success",
                    "files": result,
                    "message": msg
                };
                // res.send(jsonResponse);
                callback(null, jsonResponse);
            } else {
                var msg = "";
                jsonResponse = {
                    "statusCode": 201,
                    "result": "success",
                    "files": files,
                    "message": msg
                };
                // res.send(jsonResponse);
                callback(null, jsonResponse);
            }
        });
        mongo.releaseConnection(mongoConn);
    });
}

function createDirectory(req,callback) {
    //assigning unique id to  directory
    let uuidv4 = uuid();
    console.log(uuidv4);
    let dir_created_timestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    let jsonResponse = {};
    console.log("user id in create directory is ", req.user_uuid);
    mongo.connect(mongoLogin, function (mongoConn) {
        console.log('Connected to mongo at: ' + mongoLogin);

        let collection = mongoConn.collection('files');
        let payload = {
            "user_uuid" : [req.user_uuid],
            "dir_name" : req.dir_name,
            "dir_uuid" : uuidv4,
            "dir_created": dir_created_timestamp,
            "star_id" : '0',
            "owner_uuid" : req.user_uuid,
            "filesArray" : []
        }
        collection.insert(payload, function (err, result) {
            // console.log("file result is", result);
            if (err) {
                var msg = "Error Occured. Create once again";
                jsonResponse = {
                    "statusCode": 500,
                    "result": "Error",
                    "message": msg
                };
                // res.send(jsonResponse);
                callback(null, jsonResponse);
            } else {
                if (result!==null) {
                    var msg = "Directory created";
                    jsonResponse = {
                        "statusCode": 201,
                        "result": "Success",
                        "data" : result[0],
                        "message": msg
                    };
                    // res.send(jsonResponse);
                    callback(null, jsonResponse);
                } else {
                    var msg = "Error Occured";
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
        mongo.releaseConnection(mongoConn);
    });
}

function deleteFile(req,callback){
    let jsonResponse = {};

    mongo.connect(mongoLogin, function (mongoConn) {
        console.log('Connected to mongo at: ' + mongoLogin);

        let collection = mongoConn.collection('files');
        let id = "ObjectId('"+req._id+"')";
        console.log("id is",id);
        collection.remove({ "_id" : new mongodb.ObjectID(req._id)}, function (err, result) {
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
                if (result!==null) {
                    let msg = "file deleted";
                    jsonResponse = {
                        "statusCode": 201,
                        "result": "Success",
                        "data" : result,
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
        mongo.releaseConnection(mongoConn);
    });
}

function deleteDirectory(req,callback){
    let jsonResponse = {};

    mongo.connect(mongoLogin, function (mongoConn) {
        console.log('Connected to mongo at: ' + mongoLogin);

        let collection = mongoConn.collection('files');
        let id = "ObjectId('"+req._id+"')";
        console.log("id is",id);
        collection.remove({ "_id" : new mongodb.ObjectID(req._id)}, function (err, result) {
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
                if (result!==null) {
                    let msg = "directory deleted";
                    jsonResponse = {
                        "statusCode": 201,
                        "result": "Success",
                        "data" : result,
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
        mongo.releaseConnection(mongoConn);
    });
}

function shareFile(req,callback){
    let jsonResponse = {};
    let file = req.file;

    mongo.connect(mongoLogin, function(mongoConn){
        console.log('Connected to mongo at: ' + mongoLogin);
        let collection = mongoConn.collection('user');
        let collectionFile = mongoConn.collection('files');

        collection.findOne({email: req.shareToEmail }, function(err, result){
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
                var msg = "User is not available in dropbox";
                jsonResponse = {
                    "statusCode": 300,
                    "result": "Error",
                    "message": msg
                };
                // res.send(jsonResponse);
                callback(null, jsonResponse);
            } else if (result) {
                collectionFile.update({ "_id" : new mongodb.ObjectID(req._id)},
                    {$push:{"user_uuid": result.user_uuid }}, function (err, result1) {
                        console.log("result is", result1);
                        if (err) {
                            var msg = "Share file failed";
                            jsonResponse = {
                                "statusCode": 500,
                                "result": "Error",
                                "message": msg
                            };
                            // res.send(jsonResponse);
                            callback(null, jsonResponse);
                        } else {
                            if(result1.result.nModified > 0){
                                var msg = "Share file success";
                                jsonResponse = {
                                    "statusCode": 201,
                                    "result": "Success",
                                    "message": msg
                                };
                                // res.send(jsonResponse);
                                callback(null, jsonResponse);
                            } else {
                                var msg = "Error Occured";
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

function shareDirectory(req,callback){
    let jsonResponse = {};
    let file = req.file;

    mongo.connect(mongoLogin, function(mongoConn){
        console.log('Connected to mongo at: ' + mongoLogin);
        let collection = mongoConn.collection('user');
        let collectionFile = mongoConn.collection('files');

        collection.findOne({email: req.shareToEmail }, function(err, result){
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
                var msg = "User is not available in dropbox";
                jsonResponse = {
                    "statusCode": 300,
                    "result": "Error",
                    "message": msg
                };
                res.send(jsonResponse);
            } else if (result) {
                collectionFile.update({ "_id" : new mongodb.ObjectID(req._id)},
                    {$push:{"user_uuid": result.user_uuid }}, function (err, result1) {
                        console.log("result is", result1);
                        if (err) {
                            var msg = "Share folder failed";
                            jsonResponse = {
                                "statusCode": 500,
                                "result": "Error",
                                "message": msg
                            };
                            // res.send(jsonResponse);
                            callback(null, jsonResponse);
                        } else {
                            if(result1.result.nModified > 0){
                                var msg = "Share folder success";
                                jsonResponse = {
                                    "statusCode": 201,
                                    "result": "Success",
                                    "message": msg
                                };
                                // res.send(jsonResponse);
                                callback(null, jsonResponse);
                            } else {
                                var msg = "Error Occured";
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

function shareLink(req,callback){
    let jsonResponse = {};
    let file = req.file;

    mongo.connect(mongoLogin, function(mongoConn){
        console.log('Connected to mongo at: ' + mongoLogin);
        let collection = mongoConn.collection('user');
        let collectionLink = mongoConn.collection('link');

        collection.findOne({email: req.shareToEmail }, function(err, result){
            console.log("share to email is",req.shareToEmail);
            console.log("result is",result);
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
                var msg = "User is not available in dropbox";
                jsonResponse = {
                    "statusCode": 300,
                    "result": "Error",
                    "message": msg
                };
                // res.send(jsonResponse);
                callback(null, jsonResponse);
            } else if(result){
                let data = {
                    "user_uuid":result.user_uuid,
                    "link":req.link
                }
                collectionLink.insert(data , function(err,result1){
                    if (err) {
                        var msg = "Share link failed";
                        jsonResponse = {
                            "statusCode": 500,
                            "result": "Error",
                            "message": msg
                        };
                        // res.send(jsonResponse);
                        callback(null, jsonResponse);
                    } else {
                        var msg = "Share file success";
                        jsonResponse = {
                            "statusCode": 201,
                            "result": "Error",
                            "message": msg
                        };
                        // res.send(jsonResponse);
                        callback(null, jsonResponse);
                    }
                });
            }
        });
        mongo.releaseConnection(mongoConn);
    });
}

function deleteFileInDir(req,callback){
    let jsonResponse = {};

    mongo.connect(mongoLogin, function (mongoConn) {
        console.log('Connected to mongo at: ' + mongoLogin);

        let collection = mongoConn.collection('files');

        collection.update({"_id" : new mongodb.ObjectID(req._id)},
            { $pull: { filesArray: {file_uuid : req.file_uuid }}}, function (err, result) {
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
                    if (result!==null) {
                        let msg = "directory deleted";
                        jsonResponse = {
                            "statusCode": 201,
                            "result": "Success",
                            "data" : result,
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
        mongo.releaseConnection(mongoConn);
    });
}

function starDirFile(req,callback){
    let jsonResponse = {};

    mongo.connect(mongoLogin, function (mongoConn) {

        let collection = mongoConn.collection('files');
        collection.update({ "_id" : new mongodb.ObjectID(req._id)},
            {$set:{"star_id": "1" }}, function (err, result) {
                if (err) {
                    var msg = "Error Occured. Star once again";
                    jsonResponse = {
                        "statusCode": 500,
                        "result": "Error",
                        "message": msg
                    };
                    // res.send(jsonResponse);
                    callback(null, jsonResponse);
                } else {
                    if(result.result.nModified > 0){
                        var msg = "File/Directory starred";
                        jsonResponse = {
                            "statusCode": 201,
                            "result": "Success",
                            "data" : result[0],
                            "message": msg
                        };
                        // res.send(jsonResponse);
                        callback(null, jsonResponse);
                    } else {
                        var msg = "Error Occured";
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
        mongo.releaseConnection(mongoConn);
    });
}

