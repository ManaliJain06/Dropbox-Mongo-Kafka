/**
 * Created by ManaliJain on 11/2/17.
 */
var mongo = require("./mongoConnector");
var mongodb = require('mongodb');
var mongoLogin = "mongodb://localhost:27017/Dropboxuser";
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var uuid = require('uuid/v4');

function handleUserRequest(req,api, callback) {

    console.log('api is',api);
    switch(api) {
        case "login" :
            userLoginData(req,function(err,jsonResponse){
                callback(null, jsonResponse);
                return;
            });
            return;

        case "signup" :
            userSignupData(req,function(err,jsonResponse){
                callback(null, jsonResponse);
                return;
            });
            return;

        case "about" :
            postUserAbout(req,function(err,jsonResponse){
                callback(null, jsonResponse);
                return;
            });
            return;

        case "interest" :
            postUserInterest(req,function(err,jsonResponse){
                callback(null, jsonResponse);
                return;
            });
            return;

        case "links" :
            getLinks(req,function(err,jsonResponse){
                callback(null, jsonResponse);
            });
            return;
    }


}
exports.handleUserRequest = handleUserRequest;

function postUserAbout(req, callback){
    let jsonRequest = {
        "work": req.work,
        "education": req.education,
        "phone": req.phone,
        "events": req.events
    }
    let request = JSON.stringify(jsonRequest);
    console.log(request);
    let jsonResponse = {};

    mongo.connect(mongoLogin, function (mongoConn) {

        let collection = mongoConn.collection('user');
        collection.update({"_id": new mongodb.ObjectID(req._id)},
            {$set: {"overview": request}}, function (err, result) {
                // console.log("result is", result);
                if (err) {
                    let msg = "Error Occured";
                    jsonResponse = {
                        "statusCode": 500,
                        "result": "Error",
                        "message": msg
                    };
                    // res.send(jsonResponse);
                    callback(null, jsonResponse);
                } else {
                    if (result.result.nModified > 0) {
                        var msg = "Saved Successfully";
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
                }
            });
    });
}

function userLoginData(req,callback){
    var jsonResponse = {};
    // console.log("In handle request:"+ JSON.stringify(msg));

    let email = req.email;
    let password  = req.password;
    console.log(email);
    console.log(password);

    mongo.connect(mongoLogin, function(mongoConn){
        let collection = mongoConn.collection('user');

        collection.findOne({email: email}, function(err, result){
            console.log("login user is",result);
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
            else if (result) {
                bcrypt.compare(password, result.password).then(function (check) {
                    if (check) {
                        //JWT
                        var msg = "Valid user";
                        var body = result;
                        const user = {
                            name: body.firstname,
                            username: body.lastname,
                            email: body.email,
                            user_uuid: body.user_uuid
                        };

                        const token = jwt.sign(user, 'dropbox', {
                            expiresIn: '30m' // expires in 30 mins
                        });
                        // console.log("token", token);
                        jsonResponse = {
                            "user": user,
                            "token": token,
                            "statusCode": 201,
                            "result": "Success",
                            "message": msg,
                            "isLogged": true,
                            "payload": result
                        };
                        // res.send(jsonResponse);
                        callback(null, jsonResponse);
                        //JWT close
                    } else {
                        var msg = "Invalid userName or Password";
                        jsonResponse = {
                            "statusCode": 400,
                            "result": "Error",
                            "message": msg
                        };
                        // res.send(jsonResponse);
                        callback(null, jsonResponse);
                    }
                });
            } else{
                console.log("Invalid");
                var msg = "User doesn't exist. Please Signup to continue";
                jsonResponse = {
                    "statusCode": 400,
                    "result": "Success",
                    "message": msg,
                };
                // res.send(jsonResponse);
                callback(null, jsonResponse);
            }
        });
        mongo.releaseConnection(mongoConn);
    });
}

function postUserInterest(req,callback){
    let jsonRequest ={
        "music" : req.music,
        "sports" : req.sports,
        "shows" : req.shows,
    };
    let request = JSON.stringify(jsonRequest);
    console.log(request);
    let jsonResponse ={};

    mongo.connect(mongoLogin, function (mongoConn) {

        let collection = mongoConn.collection('user');
        collection.update({ "_id" : new mongodb.ObjectID(req._id)},
            {$set:{"interest": request }}, function (err, result) {
                // console.log("result is", result);
                if (err) {
                    let msg = "Error Occured";
                    jsonResponse = {
                        "statusCode": 500,
                        "result": "Error",
                        "message": msg
                    };
                    // res.send(jsonResponse);
                    callback(null, jsonResponse);
                } else {
                    if(result.result.nModified > 0){
                        var msg = "Saved Successfully";
                        jsonResponse = {
                            "statusCode": 201,
                            "result": "Success",
                            "message" : msg
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
    });
}

function userSignupData(req,callback){
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

function getLinks(req,callback){
    let jsonResponse = {};

    mongo.connect(mongoLogin, function (mongoConn) {
        console.log('Connected to mongo at: ' + mongoLogin);

        let collection = mongoConn.collection('link');
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
                    "link": result,
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
    });
}