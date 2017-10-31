/**
 * Created by ManaliJain on 10/6/17.
 */
var jwt = require('jsonwebtoken');

exports.verifyToken = function(req,res,next) {
    var jsonResponse = {};
    const token = req.headers.authorization;
    if(token !== undefined && token !== null){
        jwt.verify(token, 'dropbox',function(err,data){
            if(err) {
                console.log("error");
                var msg = "Invalid Token";
                jsonResponse = {
                    "statusCode": 601,
                    "result": "Error",
                    "message": msg
                };
                res.send(jsonResponse);
            } else {
                console.log("verified");
                console.log("data",data);
                module.exports.user_uuid = data.user_uuid;
                console.log(module.exports.user_uuid);
                next();
            }
        })
    }else {
        var msg = "Token does not exist";
        jsonResponse = {
            "statusCode": 600,
            "result": "Error",
            "message": msg
        };
        res.send(jsonResponse);
    }
};