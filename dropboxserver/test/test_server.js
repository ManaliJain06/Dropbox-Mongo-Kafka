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

    it('It should retrieve all the groups of user', function(done) {
        request.post('http://localhost:3003/getGroup', {
        }, function(error, response, body) {
            let res = JSON.parse(body);
            assert.equal(201, res.statusCode);
            done();
        });
    });

    it('It should share a file to another user ', function(done) {
        request.post('http://localhost:3003/shareFile', {
            form : {
                "shareToEmail": 'jon.smith@gmail.com',
                "_id" : '5a025042456fd00c0de421d5'
            }
        }, function(error, response, body) {
            let res = JSON.parse(body);
            assert.equal(201, res.statusCode);
            done();
        });
    });

    it('It should delete a file', function(done) {
        request.post('http://localhost:3003/deleteFile', {
            form : {
                "_id" : '5a025042456fd00c0de421d5'
            }
        }, function(error, response, body) {
            let res = JSON.parse(body);
            assert.equal(201, res.statusCode);
            done();
        });
    });

    it('It should share the directory and all of its files to another user', function(done) {
        request.post('http://localhost:3003/shareDir', {
            form : {
                "shareToEmail": 'jon.smith@gmail.com',
                "_id" : '5a0251ab53ffba0c32be01d8'
            }
        }, function(error, response, body) {
            let res = JSON.parse(body);
            assert.equal(201, res.statusCode);
            done();
        });
    });

    it('It should delete a file in the directory', function(done) {
        request.post('http://localhost:3003/deleteFileInDir', {
            form : {
                "file_uuid" : 'b6328028-b5f8-4b85-9c22-7914afc989d9',
                "_id": '5a0251ab53ffba0c32be01d8'
            }
        }, function(error, response, body) {
            let res = JSON.parse(body);
            assert.equal(201, res.statusCode);
            done();
        });
    });

    it('It should delete a directory', function(done) {
        request.post('http://localhost:3003/deleteDir', {
            form : {
                "_id" : '5a0251ab53ffba0c32be01d8'
            }
        }, function(error, response, body) {
            let res = JSON.parse(body);
            assert.equal(201, res.statusCode);
            done();
        });
    });

    it('It should star a directory/file', function(done) {
        request.post('http://localhost:3003/star', {
            form : {
                "_id": '5a0251f153ffba0c32be01da'
            }
        }, function(error, response, body) {
            let res = JSON.parse(body);
            assert.equal(201, res.statusCode);
            done();
        });
    });

    it('It should create a group for a user', function(done) {
        request.post('http://localhost:3003/createGroup', {
            form : {
                "groupName" : "Mocha test group",
                "user_uuid" : "7d72ce2e-b8e0-492d-94a0-daf3250451ae",
                "user_name" : "Manali Jain"
            }
        }, function(error, response, body) {
            let res = JSON.parse(body);
            assert.equal(201, res.statusCode);
            done();
        });
    });

    it('It should share a link to a user', function(done) {
        request.post('http://localhost:3003/shareLink', {
            form : {
                "shareToEmail" : "jon.smith@gmail.com",
                "link" : "http://localhost:3003/1510096166473Tickets.pdf"
            }
        }, function(error, response, body) {
            let res = JSON.parse(body);
            assert.equal(201, res.statusCode);
            done();
        });
    });

    it('It should give error on sharing a link that email of the user does not exist', function(done) {
        request.post('http://localhost:3003/shareLink', {
            form : {
                "shareToEmail" : "8f66f228-3b4a-40f2-aed9-7e6266d3135c",
                "link" : "http://localhost:3003/1510096166473Tickets.pdf"
            }
        }, function(error, response, body) {
            let res = JSON.parse(body);
            assert.equal(300, res.statusCode);
            done();
        });
    });

});