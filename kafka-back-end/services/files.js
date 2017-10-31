/**
 * Created by ManaliJain on 10/31/17.
 */
var mongo = require("./mongoConnector");
var mongodb = require('mongodb');
var mongoLogin = "mongodb://localhost:27017/Dropboxuser";
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var uuid = require('uuid/v4');

function handle_request(req, callback){

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
    });
}

exports.handle_request = handle_request;
