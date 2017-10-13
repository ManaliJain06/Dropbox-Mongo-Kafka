/**
 * Created by ManaliJain on 9/29/17.
 */
var uuid = require('uuid/v4');
var mysqlConnection = require('./mysqlConnector');
var session = require('client-sessions');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
// var app = require('../app');
// var hash = require('./encryption').hash;

function checkErrors(err,result,res){
    if(err){
        res.end('An error occurred');
        console.log(err);
    } else {
        res.end(result);
    }
}
exports.userSignupData = function(req, res){
    //assigning unique id to user
    let uuidv4 = uuid();
    console.log(uuidv4);

    let jsonResponse ={};
    let saltRounds = 10;

    //encrypting password using bcrypt js
    // var salt = bcrypt.genSaltSync(10);
    // console.log("Salt: "+salt);
    // var encryptedPassword = bcrypt.hashSync(req.body.data.password,salt);

    bcrypt.hash(req.body.data.password, saltRounds).then(function(hash) {
        console.log("hash :", hash);
        let userDetails  ="insert into User(firstname,lastname,email,password,user_uuid) values ('"
            +req.body.data.firstName+"','"+req.body.data.lastName+"','"
            +req.body.data.email+"','"+hash+"','"+uuidv4+"');";
        console.log("query:",userDetails );
        console.log(userDetails);

        mysqlConnection.userSignup(userDetails, function(err,result){
            if(err){
                if(err.code ==="ER_DUP_ENTRY"){
                    var msg = "Username Already exists";
                    jsonResponse = {
                        "statusCode": 401,
                        "result": "Error",
                        "message" : msg
                    };
                    res.send(jsonResponse);
                } else{
                    var msg = "Error Occured";
                    jsonResponse = {
                        "statusCode": 500,
                        "result": "Error",
                        "message" : msg
                    };
                    res.send(jsonResponse);
                }
            } else {
                if(result.affectedRows>0){
                    var msg = "Successfully Registered. Please login with your credentials";
                    jsonResponse = {
                        "statusCode": 201,
                        "result": "Success",
                        "message" : msg
                    };
                    res.send(jsonResponse);
                } else {
                    var msg = "Error Occured";
                    jsonResponse = {
                        "statusCode": 400,
                        "result": "Error",
                        "message" : msg
                    };
                    res.send(jsonResponse);
                }
            }
        });
    });

    // var userDetails  ="insert into User(firstname,lastname,email,password,user_uuid,salt) values ('"
    //     +req.body.data.firstName+"','"+req.body.data.lastName+"','"
    //     +req.body.data.email+"','"+encryptedPassword+"','"+uuidv4+"','"+salt+"');";
    // console.log(userDetails);


}

exports.userLoginData = function(req,res) {
    let jsonResponse ={};
    let email = req.body.data.email;
    let password  = req.body.data.password;
    console.log(email);
    console.log(password);
    let loginCredentials = "select * from User where email = '"+email+"';";
    console.log(loginCredentials);
    mysqlConnection.userSignup(loginCredentials, function(err,result){
        if(err){
            var msg = "Error Occured";
            jsonResponse = {
                "statusCode": 500,
                "result": "Error",
                "message" : msg
            };
        } else {
            console.log("result is ",result);
            if(result.length > 0) {
                bcrypt.compare(password, result[0].password).then(function (check) {
                    // check the response
                    if (check) {
                        // req.session.email = email;
                        // console.log("session set", req.session.email);

                        //JWT
                        var msg = "Valid user";
                        var body = result[0];
                        const user = {
                            name: body.firstname,
                            id: body.id,
                            username: body.lastname,
                            email: body.email,
                            user_uuid: body.user_uuid
                        };

                        const token = jwt.sign(user, 'dropbox', {
                            expiresIn: '30m' // expires in 30 mins
                        });
                        console.log("token",token);
                        jsonResponse = {
                            "user": user,
                            "token": token,
                            "statusCode": 201,
                            "result": "Success",
                            "message": msg,
                            "isLogged": true,
                            "payload": result
                            };
                        res.send(jsonResponse);



                         //JWT close

                        // var msg = "Valid user";
                        // jsonResponse = {
                        //     "statusCode": 201,
                        //     "result": "Success",
                        //     "message": msg,
                        //     "isLogged": true,
                        //     "payload": result
                        // };
                        // res.send(jsonResponse);

                    } else {
                        var msg = "Invalid userName or Password";
                        jsonResponse = {
                            "statusCode": 400,
                            "result": "Error",
                            "message": msg
                        };
                        res.send(jsonResponse);
                    }
                });
            }else{
                console.log("Invalid");
                var msg = "User doesn't exist. Please Signup to continue";
                jsonResponse = {
                    "statusCode": 400,
                    "result": "Success",
                    "message": msg,
                };
                res.send(jsonResponse);
            }
        }
    });
};

exports.signout = function(req,res)
{
    //destroy the session
    req.session.destroy();
    console.log('Session destroyed');
    var jsonResponse={
        "statusCode": 401
    }
    res.send(jsonResponse);
};

exports.postUserInterest = function(req,res) {
 // console.log("session", req.session.email);
    // if(req.session.email){
        let jsonRequest ={
            "music" : req.body.music,
            "sports" : req.body.sports,
            "shows" : req.body.shows,
        };
        let request = JSON.stringify(jsonRequest);
        console.log(request);
        let jsonResponse ={};

        let userInterest  = "update User set interest='" + request + "' where  id = '"+req.body.id+"';";
        console.log(userInterest);
        // let userInterest  ="insert into User set interest=?" +
        //     " where  id = '"+req.body.data.id+"' and uuid = '" + req.body.data.uuid+"';";
        // console.log(userInterest);


        mysqlConnection.userSignup(userInterest, function(err,result){
            if(err){
                var msg = "Error Occured";
                jsonResponse = {
                    "statusCode": 500,
                    "result": "Error",
                    "message": msg
                };
            } else {
                if(result.affectedRows > 0){
                    var msg = "Saved Successfully";
                    jsonResponse = {
                        "statusCode": 201,
                        "result": "Success",
                        "message" : msg
                    };
                    res.send(jsonResponse);
                } else {
                    var msg = "Error Occured";
                    jsonResponse = {
                        "statusCode": 400,
                        "result": "Error",
                        "message": msg
                    };
                    res.send(jsonResponse);
                }
            }
        });
    // } else {
    //     var jsonResponse = {
    //         "statusCode" : 501,
    //         "msg": "session expired"
    //     }
    //     res.send(jsonResponse);

}

exports.postUserAbout = function(req,res) {
    let jsonRequest ={
        "work" : req.body.work,
        "education" : req.body.education,
        "phone" : req.body.phone,
        "events" : req.body.events
    }
    let request = JSON.stringify(jsonRequest);
    console.log(request);
    let jsonResponse ={};

    let userInterest  = "update User set overview='" + request + "' where  id = '"+req.body.id+"';";
    console.log(userInterest);
    // let userInterest  ="insert into User set interest=?" +
    //     " where  id = '"+req.body.data.id+"' and uuid = '" + req.body.data.uuid+"';";
    // console.log(userInterest);


    mysqlConnection.userSignup(userInterest, function(err,result){
        if(err){
            var msg = "Error Occured";
            jsonResponse = {
                "statusCode": 500,
                "result": "Error",
                "message": msg
            };
        } else {
            if(result.affectedRows > 0){
                var msg = "Saved Successfully";
                jsonResponse = {
                    "statusCode": 201,
                    "result": "Success",
                    "message" : msg
                };
                res.send(jsonResponse);
            } else {
                var msg = "Error Occured";
                jsonResponse = {
                    "statusCode": 400,
                    "result": "Error",
                    "message": msg
                };
                res.send(jsonResponse);
            }
        }
    });
}

