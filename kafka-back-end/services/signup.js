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

    let uuidv4 = uuid();
    console.log(uuidv4);

    let jsonResponse = {};
    let saltRounds = 10;

    bcrypt.hash(req.password, saltRounds).then(function (hash) {
        console.log("hash :", hash);
        mongo.connect(mongoLogin, function (mongoConn) {
            console.log('Connected to mongo at: ' + mongoLogin);

            let collection = mongoConn.collection('user');
            // to find whether the user is already in the databse
            collection.findOne({'email': req.email}, function (err, match) {
                console.log("match is", match);
                if (err) {
                    var msg = "Error Occured";
                    jsonResponse = {
                        "statusCode": 500,
                        "result": "Error",
                        "message": msg
                    };
                    // res.send(jsonResponse);
                    callback(null, jsonResponse);
                } else if (match !== null) {
                    var msg = "Username Already exists";
                    jsonResponse = {
                        "statusCode": 401,
                        "result": "Error",
                        "message": msg
                    };
                    // res.send(jsonResponse);
                    callback(null, jsonResponse);
                } else {
                    var payload = {
                        "firstname": req.firstName,
                        "lastname": req.lastName,
                        "email": req.email,
                        "password": hash,
                        "user_uuid": uuidv4,
                        "overview": null,
                        "interest": null
                    }
                    collection.insert(payload, function (err, result) {
                        console.log("result is", result);
                        if (result) {
                            var msg = "Successfully Registered. Please login with your credentials";
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
                                "statusCode": 400,
                                "result": "Error",
                                "message": msg
                            };
                            // res.send(jsonResponse);
                            callback(null, jsonResponse);
                        }
                    });
                }
            });
        });
    });
}

exports.handle_request = handle_request;
