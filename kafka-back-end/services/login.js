/**
 * Created by ManaliJain on 10/30/17.
 */
var mongo = require("./mongoConnector");
var mongodb = require('mongodb');
var mongoLogin = "mongodb://localhost:27017/Dropboxuser";
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

function handle_request(req, callback){

    var jsonResponse = {};
    // console.log("In handle request:"+ JSON.stringify(msg));

    let email = req.email;
    let password  = req.password;
    console.log(email);
    console.log(password);

    mongo.connect(mongoLogin, function(){
        let collection = mongo.collection('user');

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
    });
}

exports.handle_request = handle_request;
