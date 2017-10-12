/**
 * Created by ManaliJain on 10/7/17.
 */


var uuid = require('uuid/v4');
var mysqlConnection = require('./mysqlConnector');
var session = require('client-sessions');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var sessionMgmt = require('./sessionManagement');

exports.createDirectory = function(req, res) {
    //assigning unique id to  directory
    let uuidv4 = uuid();
    console.log(uuidv4);
    var dir_created_timestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    let jsonResponse = {};

        let createDir = "insert into directory(dir_uuid,dir_name,dir_created,user_uuid,hasFiles,star_id) values ('"
            + uuidv4 + "','" + req.body.dir_name + "','" + dir_created_timestamp + "','" + req.body.user_uuid + "', '0', '0');";
        console.log("query:", createDir);

        // let mappingDir_User = "insert into file_dir_user(dir_uuid,user_uuid) values ('"
        //     + uuidv4 + "','" + req.body.user_uuid +"');";


    // let mappingDir_User =  "insert into file_dir_user(dir_uuid,user_uuid) values ('"
    // //     + uuidv4 + "','" + req.body.user_uuid +"');";

    // console.log("query:", mappingDir_User);

        mysqlConnection.userSignup(createDir, function (err, result) {
            if (err) {
                var msg = "Error Occured. Create once again";
                jsonResponse = {
                    "statusCode": 500,
                    "result": "Error",
                    "message": msg
                };
                res.send(jsonResponse);
            } else {
                if (result.affectedRows > 0) {
                    var msg = "Directory created";
                        jsonResponse = {
                            "statusCode": 201,
                            "result": "Success",
                            "data" : result[0],
                            "message": msg
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

exports.deleteDirectory = function(req, res) {
    let jsonResponse = {};

    let deleteDir = "delete from directory where dir_name = '" + req.body.dir_name + "' AND " +
        " AND user_uuid = '" + req.body.user_uuid + "'dir_uuid = '" + req.body.dir_uuid + "';";
    console.log("query:", deleteDir);
    console.log(deleteDir);

    let mapping_deleteDir = "delete from file_dir_user where user_uuid = '" + req.body.user_uuid + "' AND " +
        "dir_uuid = '" + req.body.dir_uuid + "';";
    console.log(mapping_deleteDir);

    // Do this also
    // let delete_Files_inside_directory =

    mysqlConnection.userSignup(deleteDir, function (err, result) {
        if (err) {
            var msg = "Error Occured. delete once again";
            jsonResponse = {
                "statusCode": 500,
                "result": "Error",
                "message": msg
            };
            res.send(jsonResponse);
        } else {
            if (result.affectedRows > 0) {
                mysqlConnection.userSignup(mapping_deleteDir, function (err, result1) {
                    if (result1.affectedRows > 0) {
                        var msg = "Directory deleted";
                        jsonResponse = {
                            "statusCode": 201,
                            "result": "Success",
                            "data" : result[0],
                            "message": msg
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
                });
            }
        }
    });
}

exports.deleteFile = function(req,res) {

    let jsonResponse = {};

    let deleteFile = "delete from file where file_uuid = '" + req.body.file_uuid + "' AND " +
        "user_uuid = '" + req.body.user_uuid + "';";
    console.log("query:", deleteFile);

    mysqlConnection.userSignup(deleteFile, function (err, result) {
        if (err) {
            let msg = "Error Occured. delete once again";
            jsonResponse = {
                "statusCode": 500,
                "result": "Error",
                "message": msg
            };
            res.send(jsonResponse);
        } else {
            if (result.affectedRows > 0) {
                let msg = "Directory deleted";
                    jsonResponse = {
                        "statusCode": 201,
                        "result": "Success",
                        "data" : result[0],
                        "message": msg
                    };
                res.send(jsonResponse);
                } else {
                let msg = "Error Occured";
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

exports.starDir_files = function(req, res) {

    let jsonResponse = {};
    let starQuery = '';
    if(req.body.file_uuid!== '' && req.body.dir_uuid === ''){
         starQuery = "update file set star_id='1' where  file_uuid = '"+req.body.file_uuid+"' " +
            "AND user_uuid = '"+req.body.user_uuid+"';";
        console.log();
    } else if(req.body.dir_uuid){
         starQuery = "update directory set star_id='1' where  dir_uuid = '"+req.body.dir_uuid+"' " +
            "AND dir_name = '"+req.body.dir_name+"' AND user_uuid = '"+req.body.user_uuid+"';";
        console.log();
    }
    // let starQuery = "insert into star(dir_uuid,user_uuid) values ('"
    //     + req.body.dir_uuid + "','" + req.body.user_uuid + "');";
    // console.log("query:", starQuery);
    //
    // let mapping_star = "update directory set star_id='yes' where  dir_uuid = '"+req.body.dir_uuid+"' " +
    //     "AND dir_name = '"+req.body.dir_name+"' AND user_uuid = '"+req.body.user_uuid+"';";
    // console.log(mapping_star);

    mysqlConnection.userSignup(starQuery, function (err, result) {
        if (err) {
            var msg = "Error Occured. Star once again";
            jsonResponse = {
                "statusCode": 500,
                "result": "Error",
                "message": msg
            };
            res.send(jsonResponse);
        } else {
            if (result.affectedRows > 0) {
                var msg = "Directory starred";
                jsonResponse = {
                    "statusCode": 201,
                    "result": "Success",
                    "data" : result[0],
                    "message": msg
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

exports.getFiles = function(req, res) {

    let jsonResponse = {};
    // if(!req.body.user_uuid) {
    //     req.body.user_uuuid = sessionMgmt.user_uuid;
    // }
    // let getAllFiles = " select fdr.user_uuid, d.dir_name,d.dir_uuid, d.star_id, f.file_name, fdr.file_uuid, f.file, " +
    //         "f.file_created from file_dir_user fdr left join file f on f.file_uuid = fdr.file_uuid " +
    //         "left join directory d on d.dir_uuid = fdr.dir_uuid where " +
    //         "fdr.user_uuid = '" + sessionMgmt.user_uuid +  "';";

    var filesArray =[];
    let getFilesQuery = " select f.file_name, f.file_uuid, f.file_path, f.file_created, f.star_id from file f where f.user_uuid = '" + sessionMgmt.user_uuid +
                "' and f.isInDirectory = '0';";

    var dirArray =[];
    let getDirQuery = " select dir_name, dir_uuid, dir_created, star_id from directory where user_uuid = '" + sessionMgmt.user_uuid +
        "' and hasFiles = '0';";

    var fileDirArray =[];
    let fileDirQuery = "select fdr.user_uuid, fdr.dir_uuid, d.dir_created, d.dir_name, f.file_name, fdr.file_uuid, f.file_path," +
        " f.file_created, d.star_id from file_dir_user fdr left join file f on f.file_uuid = fdr.file_uuid" +
        " left join directory d on fdr.dir_uuid = d.dir_uuid where fdr.user_uuid = '" + sessionMgmt.user_uuid + "' " +
        " and f.isInDirectory = '1' and d.hasFiles = '1';";


    var files = [];


    mysqlConnection.userSignup(getFilesQuery, function (err, result1) {
        if (err) {
            var msg = "Error Occured. Create once again";
            jsonResponse = {
                "statusCode": 500,
                "result": "Error",
                "message": msg
            };
            res.send(jsonResponse);
        } else {
            console.log("files are",result1);
            filesArray = getAllFiles(result1);
            mysqlConnection.userSignup(getDirQuery, function (err, result2) {
                if (err) {
                    var msg = "Error Occured. Create once again";
                    jsonResponse = {
                        "statusCode": 500,
                        "result": "Error",
                        "message": msg
                    };
                    res.send(jsonResponse);
                } else {
                    console.log("directories are",result2);
                    dirArray = getAllDirectory(result2);
                    mysqlConnection.userSignup(fileDirQuery, function (err, result3) {
                        if (err) {
                            var msg = "Error Occured. Create once again";
                            jsonResponse = {
                                "statusCode": 500,
                                "result": "Error",
                                "message": msg
                            };
                            res.send(jsonResponse);
                        } else {
                            console.log("files an dir are",result3);
                            fileDirArray = getFilesAndDirectory(result3);
                            if(filesArray!== undefined){
                                files = files.concat(filesArray);
                            }
                            if(dirArray!== undefined){
                                files = files.concat(dirArray);
                            }
                            if(fileDirArray !== undefined){
                                files = files.concat(fileDirArray);
                            }
                            // files = files.concat(filesArray, dirArray, fileDirArray);
                            jsonResponse = {
                                "statusCode": 201,
                                "result": "Success",
                                "files" : files,
                                "msg" : ''
                            };
                            console.log("final array", files);
                            res.send(jsonResponse);
                        }
                    });
                }
            });
        }
    });
}

var getAllFiles = function(result) {

        let json = {};
        let files = [];

        for (let i = 0; i < result.length; i++) {
            let filesArray = [];
            if (result[i].file_name !== null) {
                let filejson = {
                    "file_name": result[i].file_name,
                    "file_created": result[i].file_created,
                    "file_path": result[i].file_path,
                    "file_uuid": result[i].file_uuid
                };
                filesArray.push(filejson);
            } else {
                filesArray = [];
            }
            json = {
                "dir_name": '',
                "dir_uuid": '',
                "dir_created": '',
                "star_id": result[i].star_id,
                "filesArray": filesArray
            };
            files.push(json);
        }
        console.log("file json", files);
    return files;
}

getAllDirectory = function(result){
    let dir = [];
    let filesArray = [];
    for(let i=0; i < result.length; i++){
        let json = {
            "dir_name":result[i].dir_name,
            "dir_uuid":result[i].dir_uuid,
            "dir_created": result[i].dir_created,
            "star_id": result[i].star_id,
            "filesArray": filesArray
        };
        dir.push(json);
    }
    console.log("dir json",dir);
    return dir;
}


getFilesAndDirectory = function(result) {
    console.log(result);
    let filesDir = [];
    let flag = true;
    for (let i = 0; i < result.length; i++) {

        for (let j = 0; j < filesDir.length; j++) {
            if (result[i].dir_name !== null && (result[i].dir_name === filesDir[j].dir_name)) {
                flag = false;
                let filejson1 = {
                    "file_name": result[i].file_name,
                    "file_created": result[i].file_created,
                    "file_path": result[i].file_path,
                    "file_uuid": result[i].file_uuid
                };
                // filesArray.push();
                var array = [];
                array = filesDir[j].filesArray;
                array.push(filejson1);

                filesDir[j].filesArray = array;

                // result.splice(i,1);
                // i = i-1;
            }
        }

        if (flag) {
            let filesArray = [];
            let filejson = {
                "file_name": result[i].file_name,
                "file_created": result[i].file_created,
                "file_path": result[i].file_path,
                "file_uuid": result[i].file_uuid
            };
            filesArray.push(filejson);

            let json = {
                "dir_name": result[i].dir_name,
                "dir_uuid": result[i].dir_uuid,
                "star_id": result[i].star_id,
                "filesArray": filesArray
            };
            filesDir.push(json);
        }
        console.log("fir & dir json",filesDir);
    }
    return filesDir;
}


// var willIGetNewPhone = new Promise(
//     function (resolve, reject) {
//         if (isMomHappy) {
//             var phone = {
//                 brand: 'Samsung',
//                 color: 'black'
//             };
//             resolve(phone); // fulfilled
//         } else {
//             var reason = new Error('mom is not happy');
//             reject(reason); // reject
//         }
//
//     }
// );
//
// // call our promise
// var askMom = function () {
//     willIGetNewPhone
//         .then(function (fulfilled) {
//             // yay, you got a new phone
//             console.log(fulfilled);
//             // output: { brand: 'Samsung', color: 'black' }
//         })
//         .catch(function (error) {
//             // oops, mom don't buy it
//             console.log(error.message);
//             // output: 'mom is not happy'
//         });
// };
//
// askMom();

exports.uploadFileInDirecotry = function(req,res){

    //use below queries to update
    // insert into file_dir_user(dir_uuid,file_uuid,user_uuid) values
    // ('e6a4b93a-ab03-4c57-8fb0-76e481869d5e','fc55d6b5-de53-48c3-8ad5-4e2a91e970e3','471e4924-4794-4f2c-b905-35a59a02382a');
    //
    // update file set isInDirectory = '1' where file_uuid = 'fc55d6b5-de53-48c3-8ad5-4e2a91e970e3';
    // update directory set hasFiles = '1' where dir_uuid = 'e6a4b93a-ab03-4c57-8fb0-76e481869d5e';
    //
}