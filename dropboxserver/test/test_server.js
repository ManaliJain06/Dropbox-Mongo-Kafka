/**
 * Created by ManaliJain on 10/13/17.
 */
/**
 * New node file
 */
let request = require('request');
let express = require('express');
let assert = require("assert");
let http = require("http");

describe('http tests', function() {

    it('should return the login if the url is correct', function(done) {
        http.get('http://localhost:3003/signup', function(res) {
            assert.equal(200, res.statusCode);
            done();
        })
    });

    // it('should not return the home page if the url is wrong', function(done) {
    //     http.get('http://localhost:3000/home', function(res) {
    //         assert.equal(404, res.statusCode);
    //         done();
    //     })
    // });
    //
    // it('should login', function(done) {
    //     request.post('http://localhost:3000/afterSignIn', {
    //         form : {
    //             inputUsername : 'pandyabhavan',
    //             inputPassword : 'a'
    //         }
    //     }, function(error, response, body) {
    //         assert.equal(200, response.statusCode);
    //         done();
    //     });
    // });
});