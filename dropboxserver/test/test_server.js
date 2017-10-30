/**
 * Created by ManaliJain on 10/13/17.
 */
/**
 * New node file
 */
let request = require('request');
let express = require('express');
let assert = require("assert");
let it = require('mocha').it;
let describe = require('mocha').describe;
let http = require("http");

describe('http tests', function() {

    // it('It should register user', function(done) {
    //     request.post('http://localhost:3003/signup', {
    //         form : {
    //             "firstname": 'Manali',
    //             "lastname" : 'Jain',
    //             "email": 'jainmanali3@gmail.com',
    //             "password": 'test@1234'
    //         }
    //     }, function(error, response, body) {
    //         var res = JSON.parse(body);
    //         assert.equal(201, res.statusCode);
    //         done();
    //     });
    // });
    //
    // it('It should say user already registered', function(done) {
    //     request.post('http://localhost:3003/signup', {
    //         form : {
    //             "firstname": 'Manali',
    //             "lastname" : 'Jain',
    //             "email": 'jainmanali@gmail.com',
    //             "password": 'test@1234'
    //         }
    //     }, function(error, response, body) {
    //         var res = JSON.parse(body);
    //         assert.equal(401, res.statusCode);
    //         done();
    //     });
    // });
    // it('It should login', function(done) {
    //     request.post('http://localhost:3003/login', {
    //         form : {
    //             "email" : 's',
    //             "password" : 's'
    //         }
    //     }, function(error, response, body) {
    //         var res = JSON.parse(body);
    //         assert.equal(201, res.statusCode);
    //         done();
    //     });
    // });
    // it('It should say invalid username and password', function(done) {
    //     request.post('http://localhost:3003/login', {
    //         form : {
    //             "email" : 'test111',
    //             "password" : 'test111'
    //         }
    //     }, function(error, response, body) {
    //         var res = JSON.parse(body);
    //         assert.equal(400, res.statusCode);
    //         done();
    //     });
    // });
    // it('It should createDirectory', function(done) {
    //     request.post('http://localhost:3003/createDirectory', {
    //         form : {
    //             "dir_name" : 'test123',
    //             "user_uuid" : '40'
    //         }
    //     }, function(error, response, body) {
    //         var res = JSON.parse(body);
    //         assert.equal(201, res.statusCode);
    //         done();
    //     });
    // })
    // it('It should return 300 as user with this email is not in dropbox', function(done) {
    //     request.post('http://localhost:3003/deleteMember', {
    //         form : {
    //             "addToEmail" : 'sdsfsg@dfd.com'
    //         }
    //     }, function(error, response, body) {
    //         var res = JSON.parse(body);
    //         assert.equal(400, res.statusCode);
    //         done();
    //     });
    // });
    // it('It should return 400 as no group exist with this id', function(done) {
    //     request.post('http://localhost:3003/deleteMember', {
    //         form : {
    //             "group_uuid" : '1',
    //             "group_name" : '1',
    //             "delete_uuid": '1'
    //         }
    //     }, function(error, response, body) {
    //         var res = JSON.parse(body);
    //         assert.equal(400, res.statusCode);
    //         done();
    //     });
    // });
    // it('It should post user Interest', function(done) {
    //     request.post('http://localhost:3003/postUserInterest', {
    //         form : {
    //             "music" : "Coldplay",
    //             "sports" : "football",
    //             "shows" : "TED talk",
    //             "id": '25'
    //         }
    //     }, function(error, response, body) {
    //         var res = JSON.parse(body);
    //         assert.equal(201, res.statusCode);
    //         done();
    //     });
    // });
    //
    // it('It should get Files and directories of user', function(done) {
    //     request.get('http://localhost:3003/getFiles', {
    //     }, function(error, response, body) {
    //         var res = JSON.parse(body);
    //         assert.equal(201, res.statusCode);
    //         done();
    //     });
    // });
    //
    // it('It should get all Links of user', function(done) {
    //     request.get('http://localhost:3003/getLinks', {
    //     }, function(error, response, body) {
    //         var res = JSON.parse(body);
    //         assert.equal(400, res.statusCode);
    //         done();
    //     });
    // });

    /**
     * New Mocha test cases for Lab 2
     */

    it('It should register user using mongo', function(done) {
        request.post('http://localhost:3003/signup', {
            form : {
                "firstname": 'Manali',
                "lastname" : 'Jain',
                "email": 'jainmanali3@gmail.com',
                "password": 'test@1234'
            }
        }, function(error, response, body) {
            let res = JSON.parse(body);
            assert.equal(201, res.statusCode);
            done();
        });
    });

    it('It should say user already registered', function(done) {
        request.post('http://localhost:3003/signup', {
            form : {
                "firstname": 'Manali',
                "lastname" : 'Jain',
                "email": 'jainmanali@gmail.com',
                "password": 'test@1234'
            }
        }, function(error, response, body) {
            var res = JSON.parse(body);
            assert.equal(401, res.statusCode);
            done();
        });
    });
    it('It should login', function(done) {
        request.post('http://localhost:3003/login', {
            form : {
                "email" : 's',
                "password" : 's'
            }
        }, function(error, response, body) {
            var res = JSON.parse(body);
            assert.equal(201, res.statusCode);
            done();
        });
    });
    it('It should say invalid username and password', function(done) {
        request.post('http://localhost:3003/login', {
            form : {
                "email" : 'test111',
                "password" : 'test111'
            }
        }, function(error, response, body) {
            var res = JSON.parse(body);
            assert.equal(400, res.statusCode);
            done();
        });
    });
    it('It should createDirectory', function(done) {
        request.post('http://localhost:3003/createDirectory', {
            form : {
                "dir_name" : 'test123',
                "user_uuid" : '40'
            }
        }, function(error, response, body) {
            var res = JSON.parse(body);
            assert.equal(201, res.statusCode);
            done();
        });
    })
    it('It should return 300 as user with this email is not in dropbox', function(done) {
        request.post('http://localhost:3003/deleteMember', {
            form : {
                "addToEmail" : 'sdsfsg@dfd.com'
            }
        }, function(error, response, body) {
            var res = JSON.parse(body);
            assert.equal(400, res.statusCode);
            done();
        });
    });
    it('It should return 400 as no group exist with this id', function(done) {
        request.post('http://localhost:3003/deleteMember', {
            form : {
                "group_uuid" : '1',
                "group_name" : '1',
                "delete_uuid": '1'
            }
        }, function(error, response, body) {
            var res = JSON.parse(body);
            assert.equal(400, res.statusCode);
            done();
        });
    });
    it('It should post user Interest', function(done) {
        request.post('http://localhost:3003/postUserInterest', {
            form : {
                "music" : "Coldplay",
                "sports" : "football",
                "shows" : "TED talk",
                "id": '25'
            }
        }, function(error, response, body) {
            var res = JSON.parse(body);
            assert.equal(201, res.statusCode);
            done();
        });
    });

    it('It should get Files and directories of user', function(done) {
        request.get('http://localhost:3003/getFiles', {
        }, function(error, response, body) {
            var res = JSON.parse(body);
            assert.equal(201, res.statusCode);
            done();
        });
    });

    it('It should get all Links of user', function(done) {
        request.get('http://localhost:3003/getLinks', {
        }, function(error, response, body) {
            var res = JSON.parse(body);
            assert.equal(400, res.statusCode);
            done();
        });
    });
});