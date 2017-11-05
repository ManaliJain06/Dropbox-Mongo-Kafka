/**
 * Created by ManaliJain on 9/29/17.
 */
var uuid = require('uuid/v4');
var mysqlConnection = require('./mysqlConnector');
var session = require('client-sessions');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var sessionMgmt = require('./sessionManagement');
var kafkaConnect = require('./kafkaConnect');
var mongo = require("./mongoConnector");
var mongodb = require('mongodb');
var mongoLogin = "mongodb://localhost:27017/Dropboxuser";
var kafka = require('./kafka/client');

function checkErrors(err,result,res){
    if(err){
        res.end('An error occurred');
        console.log(err);
    } else {
        res.end(result);
    }
}
// exports.userSignupData = function(req, res){
//     //assigning unique id to user
//     let uuidv4 = uuid();
//     console.log(uuidv4);
//
//     let jsonResponse ={};
//     let saltRounds = 10;
//
//     //encrypting password using bcrypt js
//     // var salt = bcrypt.genSaltSync(10);
//     // console.log("Salt: "+salt);
//     // var encryptedPassword = bcrypt.hashSync(req.body.data.password,salt);
//
//     bcrypt.hash(req.body.data.password, saltRounds).then(function(hash) {
//         console.log("hash :", hash);
//         let userDetails  ="insert into User(firstname,lastname,email,password,user_uuid) values ('"
//             +req.body.data.firstName+"','"+req.body.data.lastName+"','"
//             +req.body.data.email+"','"+hash+"','"+uuidv4+"');";
//         console.log("query:",userDetails );
//         console.log(userDetails);
//
//         mysqlConnection.userSignup(userDetails, function(err,result){
//             if(err){
//                 if(err.code ==="ER_DUP_ENTRY"){
//                     var msg = "Username Already exists";
//                     jsonResponse = {
//                         "statusCode": 401,
//                         "result": "Error",
//                         "message" : msg
//                     };
//                     res.send(jsonResponse);
//                 } else{
//                     var msg = "Error Occured";
//                     jsonResponse = {
//                         "statusCode": 500,
//                         "result": "Error",
//                         "message" : msg
//                     };
//                     res.send(jsonResponse);
//                 }
//             } else {
//                 if(result.affectedRows>0){
//                     var msg = "Successfully Registered. Please login with your credentials";
//                     jsonResponse = {
//                         "statusCode": 201,
//                         "result": "Success",
//                         "message" : msg
//                     };
//                     res.send(jsonResponse);
//                 } else {
//                     var msg = "Error Occured";
//                     jsonResponse = {
//                         "statusCode": 400,
//                         "result": "Error",
//                         "message" : msg
//                     };
//                     res.send(jsonResponse);
//                 }
//             }
//         });
//     });
//
//     // var userDetails  ="insert into User(firstname,lastname,email,password,user_uuid,salt) values ('"
//     //     +req.body.data.firstName+"','"+req.body.data.lastName+"','"
//     //     +req.body.data.email+"','"+encryptedPassword+"','"+uuidv4+"','"+salt+"');";
//     // console.log(userDetails);
//
//
// }

// exports.userLoginData = function(req,res) {
//     let jsonResponse ={};
//     let email = req.body.data.email;
//     let password  = req.body.data.password;
//     console.log(email);
//     console.log(password);
//     let loginCredentials = "select * from User where email = '"+email+"';";
//     console.log(loginCredentials);
//     mysqlConnection.userSignup(loginCredentials, function(err,result){
//         if(err){
//             var msg = "Error Occured";
//             jsonResponse = {
//                 "statusCode": 500,
//                 "result": "Error",
//                 "message" : msg
//             };
//         } else {
//             console.log("result is ",result);
//             if(result.length > 0) {
//                 bcrypt.compare(password, result[0].password).then(function (check) {
//                     // check the response
//                     if (check) {
//                         // req.session.email = email;
//                         // console.log("session set", req.session.email);
//
//                         //JWT
//                         var msg = "Valid user";
//                         var body = result[0];
//                         const user = {
//                             name: body.firstname,
//                             id: body.id,
//                             username: body.lastname,
//                             email: body.email,
//                             user_uuid: body.user_uuid
//                         };
//
//                         const token = jwt.sign(user, 'dropbox', {
//                             expiresIn: '30m' // expires in 30 mins
//                         });
//                         console.log("token",token);
//                         jsonResponse = {
//                             "user": user,
//                             "token": token,
//                             "statusCode": 201,
//                             "result": "Success",
//                             "message": msg,
//                             "isLogged": true,
//                             "payload": result
//                             };
//                         res.send(jsonResponse);
//
//
//
//                          //JWT close
//
//                         // var msg = "Valid user";
//                         // jsonResponse = {
//                         //     "statusCode": 201,
//                         //     "result": "Success",
//                         //     "message": msg,
//                         //     "isLogged": true,
//                         //     "payload": result
//                         // };
//                         // res.send(jsonResponse);
//
//                     } else {
//                         var msg = "Invalid userName or Password";
//                         jsonResponse = {
//                             "statusCode": 400,
//                             "result": "Error",
//                             "message": msg
//                         };
//                         res.send(jsonResponse);
//                     }
//                 });
//             }else{
//                 console.log("Invalid");
//                 var msg = "User doesn't exist. Please Signup to continue";
//                 jsonResponse = {
//                     "statusCode": 400,
//                     "result": "Success",
//                     "message": msg,
//                 };
//                 res.send(jsonResponse);
//             }
//         }
//     });
// };

exports.signout = function(req,res)
{
    //destroy the session
    // req.session.destroy();
    console.log('Session destroyed');
    var jsonResponse={
        "statusCode": 401
    }
    res.send(jsonResponse);
};

// exports.postUserInterest = function(req,res) {
//  // console.log("session", req.session.email);
//     // if(req.session.email){
//         let jsonRequest ={
//             "music" : req.body.music,
//             "sports" : req.body.sports,
//             "shows" : req.body.shows,
//         };
//         let request = JSON.stringify(jsonRequest);
//         console.log(request);
//         let jsonResponse ={};
//
//         let userInterest  = "update User set interest='" + request + "' where  id = '"+req.body.id+"';";
//         console.log(userInterest);
//         // let userInterest  ="insert into User set interest=?" +
//         //     " where  id = '"+req.body.data.id+"' and uuid = '" + req.body.data.uuid+"';";
//         // console.log(userInterest);
//
//
//         mysqlConnection.userSignup(userInterest, function(err,result){
//             if(err){
//                 var msg = "Error Occured";
//                 jsonResponse = {
//                     "statusCode": 500,
//                     "result": "Error",
//                     "message": msg
//                 };
//             } else {
//                 if(result.affectedRows > 0){
//                     var msg = "Saved Successfully";
//                     jsonResponse = {
//                         "statusCode": 201,
//                         "result": "Success",
//                         "message" : msg
//                     };
//                     res.send(jsonResponse);
//                 } else {
//                     var msg = "Error Occured";
//                     jsonResponse = {
//                         "statusCode": 400,
//                         "result": "Error",
//                         "message": msg
//                     };
//                     res.send(jsonResponse);
//                 }
//             }
//         });
//     // } else {
//     //     var jsonResponse = {
//     //         "statusCode" : 501,
//     //         "msg": "session expired"
//     //     }
//     //     res.send(jsonResponse);
//
// }

// exports.postUserAbout = function(req,res) {
//     let jsonRequest ={
//         "work" : req.body.work,
//         "education" : req.body.education,
//         "phone" : req.body.phone,
//         "events" : req.body.events
//     }
//     let request = JSON.stringify(jsonRequest);
//     console.log(request);
//     let jsonResponse ={};
//
//     let userInterest  = "update User set overview='" + request + "' where  id = '"+req.body.id+"';";
//     console.log(userInterest);
//     // let userInterest  ="insert into User set interest=?" +
//     //     " where  id = '"+req.body.data.id+"' and uuid = '" + req.body.data.uuid+"';";
//     // console.log(userInterest);
//
//
//     mysqlConnection.userSignup(userInterest, function(err,result){
//         if(err){
//             var msg = "Error Occured";
//             jsonResponse = {
//                 "statusCode": 500,
//                 "result": "Error",
//                 "message": msg
//             };
//         } else {
//             if(result.affectedRows > 0){
//                 var msg = "Saved Successfully";
//                 jsonResponse = {
//                     "statusCode": 201,
//                     "result": "Success",
//                     "message" : msg
//                 };
//                 res.send(jsonResponse);
//             } else {
//                 var msg = "Error Occured";
//                 jsonResponse = {
//                     "statusCode": 400,
//                     "result": "Error",
//                     "message": msg
//                 };
//                 res.send(jsonResponse);
//             }
//         }
//     });
// }

// exports.getLinks = function(req,res){
//     let jsonResponse = {};
//     let linkQuery = "select * from link where user_uuid = '" + sessionMgmt.user_uuid + "';";
//     console.log(linkQuery);
//     mysqlConnection.userSignup(linkQuery, function(err,result){
//         if(err){
//             var msg = "Error Occured";
//             jsonResponse = {
//                 "statusCode": 500,
//                 "result": "Error",
//                 "message": msg
//             };
//         } else {
//             if(result.length > 0){
//                 var msg = "success";
//                 jsonResponse = {
//                     "statusCode": 201,
//                     "result": "Success",
//                     "link" : result,
//                     "message" : msg
//                 };
//                 res.send(jsonResponse);
//             } else {
//                 var msg = "Error Occured";
//                 jsonResponse = {
//                     "statusCode": 400,
//                     "result": "Error",
//                     "message": msg
//                 };
//                 res.send(jsonResponse);
//             }
//         }
//     });
// }

// USING MONGODB
exports.userSignupData = function(req, res) {

    let topic= "request_topic";
    req.body.category = "dropboxUser";
    req.body.api = "signup";
    kafkaConnect.getKafkaConnection(topic, req, function(err,response){
        console.log("response of dropbox user is", response);
        if(err){
            var msg = "Error Occured";
            let jsonResponse = {
                "statusCode": 500,
                "result": "Error",
                "message": msg
            };
            res.send(jsonResponse);
        } else{
            res.send(response);
        }
    });
    //assigning unique id to user
    // let uuidv4 = uuid();
    // console.log(uuidv4);
    //
    // let jsonResponse = {};
    // let saltRounds = 10;
    //
    // bcrypt.hash(req.body.password, saltRounds).then(function (hash) {
    //     console.log("hash :", hash);
    //     mongo.connect(mongoLogin, function (mongoConn) {
    //         console.log('Connected to mongo at: ' + mongoLogin);
    //
    //         let collection = mongoConn.collection('user');
    //         // to find whether the user is already in the databse
    //         collection.findOne({'email': req.body.email}, function (err, match) {
    //             console.log("match is", match);
    //             if (err) {
    //                 var msg = "Error Occured";
    //                 jsonResponse = {
    //                     "statusCode": 500,
    //                     "result": "Error",
    //                     "message": msg
    //                 };
    //                 res.send(jsonResponse);
    //             } else if (match !== null) {
    //                 var msg = "Username Already exists";
    //                 jsonResponse = {
    //                     "statusCode": 401,
    //                     "result": "Error",
    //                     "message": msg
    //                 };
    //                 res.send(jsonResponse);
    //             } else {
    //                 var payload = {
    //                     "firstname": req.body.firstName,
    //                     "lastname": req.body.lastName,
    //                     "email": req.body.email,
    //                     "password": hash,
    //                     "user_uuid": uuidv4,
    //                     "overview": null,
    //                     "interest": null
    //                 }
    //                 collection.insert(payload, function (err, result) {
    //                     console.log("result is", result);
    //                     if (result) {
    //                         var msg = "Successfully Registered. Please login with your credentials";
    //                         jsonResponse = {
    //                             "statusCode": 201,
    //                             "result": "Success",
    //                             "message": msg
    //                         };
    //                         res.send(jsonResponse);
    //                     } else {
    //                         var msg = "Error Occured";
    //                         jsonResponse = {
    //                             "statusCode": 400,
    //                             "result": "Error",
    //                             "message": msg
    //                         };
    //                         res.send(jsonResponse);
    //                     }
    //                 });
    //             }
    //         });
    //     });
    // });
}

exports.userLoginData = function(req,res) {
    // let topic= "login_topic";
    // let response  = kafkaConnect.getKafkaConnection(topic, req);
    // console.log("dropbox server response is",response);
    // res.send(response);
    // console.log(email);

    let topic= "request_topic";
    req.body.category = "dropboxUser";
    req.body.api = "login";
    kafkaConnect.getKafkaConnection(topic, req, function(err,response){
        console.log("response of dropbox user is", response);
        if(err){
            var msg = "Error Occured";
            let jsonResponse = {
                "statusCode": 500,
                "result": "Error",
                "message": msg
            };
            res.send(jsonResponse);
        } else{
            res.send(response);
        }
    });

    // kafka.make_request('login_topic',{"username":req.body.email,"password":req.body.password}, function(err,results){
    //     console.log('in result');
    //     console.log(results);
    //     if(err){
    //         console.log('Successfully error completed');
    //         // done(err,{}) ;
    //     }
    //     else
    //     {
    //         if(results.code == 200){
    //             console.log('Successfully completed');
    //             // done(null,{username:"bhavan@b.com",password:"a"});
    //         }
    //         else {
    //             console.log('Successfully not completed');
    //             // done(null,false);
    //         }
    //     }
    // });


    // var jsonResponse = {};
    // mongo.connect(mongoLogin, function(){
    //     let collection = mongo.collection('user');
    //
    //     collection.findOne({email: req.body.email}, function(err, result){
    //         // console.log("login user is",result);
    //         if(err){
    //             var msg = "Error Occured";
    //             jsonResponse = {
    //                 "statusCode": 500,
    //                 "result": "Error",
    //                 "message": msg
    //             };
    //             res.send(jsonResponse);
    //         }
    //         else if (result) {
    //             bcrypt.compare(req.body.password, result.password).then(function (check) {
    //                 // console.log("check is",check);
    //                 // check the response
    //                 if (check) {
    //
    //                     //JWT
    //                     var msg = "Valid user";
    //                     var body = result;
    //                     const user = {
    //                         name: body.firstname,
    //                         username: body.lastname,
    //                         email: body.email,
    //                         user_uuid: body.user_uuid
    //                     };
    //
    //                     const token = jwt.sign(user, 'dropbox', {
    //                         expiresIn: '30m' // expires in 30 mins
    //                     });
    //                     // console.log("token", token);
    //                     jsonResponse = {
    //                         "user": user,
    //                         "token": token,
    //                         "statusCode": 201,
    //                         "result": "Success",
    //                         "message": msg,
    //                         "isLogged": true,
    //                         "payload": result
    //                     };
    //                     res.send(jsonResponse);
    //                     //JWT close
    //                 } else {
    //                     var msg = "Invalid userName or Password";
    //                     jsonResponse = {
    //                         "statusCode": 400,
    //                         "result": "Error",
    //                         "message": msg
    //                     };
    //                     res.send(jsonResponse);
    //                 }
    //             });
    //         } else{
    //             console.log("Invalid");
    //             var msg = "User doesn't exist. Please Signup to continue";
    //             jsonResponse = {
    //                 "statusCode": 400,
    //                 "result": "Success",
    //                 "message": msg,
    //             };
    //             res.send(jsonResponse);
    //         }
    //     });
    // });


    // var mongo = require("./mongoConnector");
    // var mongodb = require('mongodb');
    // var mongoLogin = "mongodb://localhost:27017/Dropboxuser";
    // var uuid = require('uuid/v4');
    // var bcrypt = require('bcryptjs');
    // var jwt = require('jsonwebtoken');
    //
    // function userLoginData(msg, callback){
    //
    //     var jsonResponse = {};
    //     console.log("In handle request:"+ JSON.stringify(msg));
    //
    //     let email = msg.email;
    //     let password  = msg.password;
    //     console.log(email);
    //     mongo.connect(mongoLogin, function(){
    //         let collection = mongo.collection('user');
    //
    //         collection.findOne({email: email}, function(err, result){
    //             // console.log("login user is",result);
    //             if(err){
    //                 var msg = "Error Occured";
    //                 jsonResponse = {
    //                     "statusCode": 500,
    //                     "result": "Error",
    //                     "message": msg
    //                 };
    //                 res.send(jsonResponse);
    //             }
    //             else if (result) {
    //                 bcrypt.compare(password, result.password).then(function (check) {
    //                     if (check) {
    //                         //JWT
    //                         var msg = "Valid user";
    //                         var body = result;
    //                         const user = {
    //                             name: body.firstname,
    //                             username: body.lastname,
    //                             email: body.email,
    //                             user_uuid: body.user_uuid
    //                         };
    //
    //                         const token = jwt.sign(user, 'dropbox', {
    //                             expiresIn: '30m' // expires in 30 mins
    //                         });
    //                         // console.log("token", token);
    //                         jsonResponse = {
    //                             "user": user,
    //                             "token": token,
    //                             "statusCode": 201,
    //                             "result": "Success",
    //                             "message": msg,
    //                             "isLogged": true,
    //                             "payload": result
    //                         };
    //                         // res.send(jsonResponse);
    //                         //JWT close
    //                     } else {
    //                         var msg = "Invalid userName or Password";
    //                         jsonResponse = {
    //                             "statusCode": 400,
    //                             "result": "Error",
    //                             "message": msg
    //                         };
    //                         // res.send(jsonResponse);
    //                     }
    //                 });
    //             } else{
    //                 console.log("Invalid");
    //                 var msg = "User doesn't exist. Please Signup to continue";
    //                 jsonResponse = {
    //                     "statusCode": 400,
    //                     "result": "Success",
    //                     "message": msg,
    //                 };
    //                 // res.send(jsonResponse);
    //             }
    //         });
    //     });
    //
    //     callback(null, jsonResponse);
    // }
    //
    // exports.userLoginData = userLoginData;

};

exports.postUserAbout = function(req,res) {

    let topic= "request_topic";
    req.body.category = "dropboxUser";
    req.body.api = "about";
    kafkaConnect.getKafkaConnection(topic, req, function(err,response){
        console.log("response of dropbox user is", response);
        if(err){
            var msg = "Error Occured";
            let jsonResponse = {
                "statusCode": 500,
                "result": "Error",
                "message": msg
            };
            res.send(jsonResponse);
        } else{
            res.send(response);
        }
    });

    // let jsonRequest ={
    //     "work" : req.body.work,
    //     "education" : req.body.education,
    //     "phone" : req.body.phone,
    //     "events" : req.body.events
    // }
    // let request = JSON.stringify(jsonRequest);
    // console.log(request);
    // let jsonResponse ={};
    //
    // mongo.connect(mongoLogin, function (mongoConn) {
    //
    //     let collection = mongoConn.collection('user');
    //     collection.update({ "_id" : new mongodb.ObjectID(req.body._id)},
    //         {$set:{"overview": request }}, function (err, result) {
    //             console.log("result is", result);
    //             if (err) {
    //                 let msg = "Error Occured";
    //                 jsonResponse = {
    //                     "statusCode": 500,
    //                     "result": "Error",
    //                     "message": msg
    //                 };
    //                 res.send(jsonResponse);
    //             } else {
    //                 if(result.result.nModified > 0){
    //                     var msg = "Saved Successfully";
    //                     jsonResponse = {
    //                         "statusCode": 201,
    //                         "result": "Success",
    //                         "message" : msg
    //                     };
    //                     res.send(jsonResponse);
    //                 } else {
    //                     var msg = "Error Occured";
    //                     jsonResponse = {
    //                         "statusCode": 400,
    //                         "result": "Error",
    //                         "message": msg
    //                     };
    //                     res.send(jsonResponse);
    //                 }
    //             }
    //         });
    // });
}

exports.postUserInterest = function(req,res) {

    let topic= "request_topic";
    req.body.category = "dropboxUser";
    req.body.api = "interest";
    kafkaConnect.getKafkaConnection(topic, req, function(err,response){
        console.log("response of dropbox user is", response);
        if(err){
            var msg = "Error Occured";
            let jsonResponse = {
                "statusCode": 500,
                "result": "Error",
                "message": msg
            };
            res.send(jsonResponse);
        } else{
            res.send(response);
        }
    });
    // let jsonRequest ={
    //     "music" : req.body.music,
    //     "sports" : req.body.sports,
    //     "shows" : req.body.shows,
    // };
    // let request = JSON.stringify(jsonRequest);
    // console.log(request);
    // let jsonResponse ={};
    //
    // mongo.connect(mongoLogin, function (mongoConn) {
    //
    //     let collection = mongoConn.collection('user');
    //     collection.update({ "_id" : new mongodb.ObjectID(req.body._id)},
    //         {$set:{"interest": request }}, function (err, result) {
    //             console.log("result is", result);
    //             if (err) {
    //                 let msg = "Error Occured";
    //                 jsonResponse = {
    //                     "statusCode": 500,
    //                     "result": "Error",
    //                     "message": msg
    //                 };
    //                 res.send(jsonResponse);
    //             } else {
    //                 if(result.result.nModified > 0){
    //                     var msg = "Saved Successfully";
    //                     jsonResponse = {
    //                         "statusCode": 201,
    //                         "result": "Success",
    //                         "message" : msg
    //                     };
    //                     res.send(jsonResponse);
    //                 } else {
    //                     var msg = "Error Occured";
    //                     jsonResponse = {
    //                         "statusCode": 400,
    //                         "result": "Error",
    //                         "message": msg
    //                     };
    //                     res.send(jsonResponse);
    //                 }
    //             }
    //         });
    // });
}

exports.getLinks = function(req,res){

    let topic= "request_topic";
    req.body.category = "dropboxUser";
    req.body.api = "links";
    req.body.user_uuid = sessionMgmt.user_uuid;
    kafkaConnect.getKafkaConnection(topic, req, function(err,response){
        console.log("response of dropbox user is", response);
        if(err){
            var msg = "Error Occured";
            let jsonResponse = {
                "statusCode": 500,
                "result": "Error",
                "message": msg
            };
            res.send(jsonResponse);
        } else{
            res.send(response);
        }
    });
    // let jsonResponse = {};
    //
    // mongo.connect(mongoLogin, function (mongoConn) {
    //     console.log('Connected to mongo at: ' + mongoLogin);
    //
    //     let collection = mongoConn.collection('link');
    //     collection.find({'user_uuid': sessionMgmt.user_uuid}).toArray(function(err, result) {
    //         console.log("file result is", result);
    //         if (err) {
    //             var msg = "Error Occured";
    //             jsonResponse = {
    //                 "statusCode": 500,
    //                 "result": "Error",
    //                 "message": msg
    //             };
    //             res.send(jsonResponse);
    //         } else if (result !== null) {
    //             var msg = "";
    //             jsonResponse = {
    //                 "statusCode": 201,
    //                 "result": "success",
    //                 "link": result,
    //                 "message": msg
    //             };
    //             res.send(jsonResponse);
    //         } else {
    //             var msg = "Error Occured";
    //             jsonResponse = {
    //                 "statusCode": 400,
    //                 "result": "Error",
    //                 "message": msg
    //             };
    //             res.send(jsonResponse);
    //         }
    //     });
    // });
}

