/**
 * Created by ManaliJain on 9/29/17.
 */
var uuid = require('uuid/v4');
var mysqlConnection = require('./mysqlConnector');
var session = require('client-sessions');
var bcrypt = require('bcryptjs');
var hash = require('./encryption').hash;

function checkErrors(err,result,res){
    if(err){
        res.end('An error occurred');
        console.log(err);
    } else {
        res.end(result);
    }
}
exports.userSignupData = function(req, res){
    //assigning unique id to eac user
    var uuidv4 = uuid();
    console.log(uuidv4);

    var jsonResponse ={};

    //encrypting password using bcrypt js
    var salt = bcrypt.genSaltSync(10);
    console.log("Salt: "+salt);
    var encryptedPassword = bcrypt.hashSync(req.body.data.password,salt);

    var userDetails  ="insert into User(firstname,lastname,email,password,user_uuid,salt) values ('"
        +req.body.data.firstName+"','"+req.body.data.lastName+"','"
        +req.body.data.email+"','"+encryptedPassword+"','"+uuidv4+"','"+salt+"');";
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
}

exports.userLoginData = function(req,res) {
    let jsonResponse ={};
    let email = req.body.data.email;
    let password  = req.body.data.password;
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
            console.log(result);
            if(result.length > 0){
                hash(password, result[0].salt, function(err, hash) {
                    if (result[0].password === hash.toString()) {
                        req.session.email = email;
                        var msg = "Valid user";
                        jsonResponse = {
                            "statusCode": 201,
                            "result": "Success",
                            "message": msg,
                            "isLogged": true,
                            "payload": result
                        };
                        res.send(jsonResponse);
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
}

exports.redirectToHomepage = function(req,res)
{
    //Checks before redirecting whether the session is valid
    if(req.session.email)
    {
        //Set these headers to notify the browser not to maintain any cache for the page being loaded
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.render("homepage",{username:req.session.username});
    }
    else
    {
        res.redirect('/');
    }
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

    // if(req.session.email){
        let jsonRequest ={
            "music" : req.body.data.music,
            "sports" : req.body.data.sports,
            "shows" : req.body.data.shows,
        }
        let request = JSON.stringify(jsonRequest);
        console.log(request);
        let jsonResponse ={};

        let userInterest  = "update User set interest='" + request + "' where  id = '"+req.body.data.id+"';";
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
        "work" : req.body.data.work,
        "education" : req.body.data.education,
        "phone" : req.body.data.phone,
        "events" : req.body.data.events
    }
    let request = JSON.stringify(jsonRequest);
    console.log(request);
    let jsonResponse ={};

    let userInterest  = "update User set overview='" + request + "' where  id = '"+req.body.data.id+"';";
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

