/**
 * Created by ManaliJain on 10/18/17.
 */
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongo = require("./mongoConnector");
var mongoURL = "mongodb://localhost:27017/login";

module.exports = function(passport) {
    passport.use('login', new LocalStrategy(function(username, password, done) {
        try {
            mongo.connect(mongoURL, function(){
                console.log('Connected to mongo at: ' + mongoURL);
                var collection = mongo.collection('userdata');

                collection.findOne({username: username, password:password}, function(err, user){
                    console.log("login user is",user);
                    if (user) {
                        done(null, user);

                    } else {
                        done(null, false);
                    }
                });
            });
        }
        catch (e){
            done(e,{});
        }
    }));
};


