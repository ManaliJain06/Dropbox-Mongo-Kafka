/**
 * Created by ManaliJain on 10/18/17.
 */
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var kafka = require('./kafka/client');

module.exports = function (passport) {
    passport.use('login', new LocalStrategy(function (username, password, done) {
        try {
            kafka.make_request('request_topic', {
                "username": username,
                "password": password,
                "category": "dropboxUser",
                "api": "login"
            }, function (err, results) {
                if (err) {
                   done(err,{})
                } else {
                    done(null,results);
                }
            });
        }
        catch (e) {
            done(e, {});
        }
    }));
};


