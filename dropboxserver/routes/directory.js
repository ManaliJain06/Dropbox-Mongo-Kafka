/**
 * Created by ManaliJain on 10/7/17.
 */


var uuid = require('uuid/v4');
var mysqlConnection = require('./mysqlConnector');
var moment = require('moment');
var sessionMgmt = require('./sessionManagement');

var mongo = require("./mongoConnector");
var mongodb = require('mongodb');
var mongoLogin = "mongodb://localhost:27017/Dropboxuser";
var kafkaConnect = require('./kafkaConnect');


//MYSQL code

// exports.createDirectory = function(req, res) {
//     //assigning unique id to  directory
//     let uuidv4 = uuid();
//     console.log(uuidv4);
//     var dir_created_timestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
//
//     let jsonResponse = {};
//
//         let createDir = "insert into directory(dir_uuid,dir_name,dir_created,user_uuid,hasFiles,star_id) values ('"
//             + uuidv4 + "','" + req.body.dir_name + "','" + dir_created_timestamp + "','" + req.body.user_uuid + "', '0', '0');";
//         console.log("query:", createDir);
//
//         // let mappingDir_User = "insert into file_dir_user(dir_uuid,user_uuid) values ('"
//         //     + uuidv4 + "','" + req.body.user_uuid +"');";
//
//
//     // let mappingDir_User =  "insert into file_dir_user(dir_uuid,user_uuid) values ('"
//     // //     + uuidv4 + "','" + req.body.user_uuid +"');";
//
//     // console.log("query:", mappingDir_User);
//
//         mysqlConnection.userSignup(createDir, function (err, result) {
//             if (err) {
//                 var msg = "Error Occured. Create once again";
//                 jsonResponse = {
//                     "statusCode": 500,
//                     "result": "Error",
//                     "message": msg
//                 };
//                 res.send(jsonResponse);
//             } else {
//                 if (result.affectedRows > 0) {
//                     var msg = "Directory created";
//                         jsonResponse = {
//                             "statusCode": 201,
//                             "result": "Success",
//                             "data" : result[0],
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
//                 }
//         });
// }

// exports.deleteDirectory = function(req, res) {
//     let jsonResponse = {};
//
//     let deleteDir = "delete from directory where dir_name = '" + req.body.dir_name + "' AND " +
//         "user_uuid = '" + req.body.user_uuid + "' AND dir_uuid = '" + req.body.dir_uuid + "';";
//
//     console.log(deleteDir);
//     let mapping_deleteDir = "delete from file_dir_user where user_uuid = '" + req.body.user_uuid + "' AND " +
//         "dir_uuid = '" + req.body.dir_uuid + "';";
//     console.log(mapping_deleteDir);
//
//          mysqlConnection.userSignup(deleteDir, function (err, result) {
//             if (err) {
//                 var msg = "Error Occured. delete once again";
//                 jsonResponse = {
//                     "statusCode": 500,
//                     "result": "Error",
//                     "message": msg
//                 };
//                 res.send(jsonResponse);
//             } else {
//                 if (result.affectedRows > 0) {
//
//                     if(req.body.file.length >0){
//                         mysqlConnection.userSignup(mapping_deleteDir, function (err, result1) {
//                             if (result1.affectedRows > 0) {
//
//                                 for(let i =0;i< req.body.file.length ; i++){
//                                     let file_uuid = req.body.file[i].file_uuid;
//                                     let deleteFile = "delete from file where file_uuid = '" + file_uuid + "' AND " +
//                                         "user_uuid = '" + req.body.user_uuid + "';";
//                                     mysqlConnection.userSignup(deleteFile, function (err, result) {
//                                         if (err) {
//                                             let msg = "Error Occured. delete once again";
//                                             jsonResponse = {
//                                                 "statusCode": 500,
//                                                 "result": "Error",
//                                                 "message": msg
//                                             };
//                                             res.send(jsonResponse);
//                                         }
//                                     });
//                                 }
//
//                                 var msg = "Directory deleted";
//                                 jsonResponse = {
//                                     "statusCode": 201,
//                                     "result": "Success",
//                                     "data" : result1[0],
//                                     "message": msg
//                                 };
//                                 res.send(jsonResponse);
//                             } else {
//                                 var msg = "Error Occured";
//                                 jsonResponse = {
//                                     "statusCode": 400,
//                                     "result": "Error",
//                                     "message": msg
//                                 };
//                                 res.send(jsonResponse);
//                             }
//                         });
//                     } else {
//                         var msg = "Directory deleted";
//                         jsonResponse = {
//                             "statusCode": 201,
//                             "result": "Success",
//                             "data" : result[0],
//                             "message": msg
//                         };
//                         res.send(jsonResponse);
//                     }
//
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
// }

// exports.deleteFile = function(req,res) {
//
//     let jsonResponse = {};
//
//     let deleteFile = "delete from file where file_uuid = '" + req.body.file_uuid + "' AND " +
//         "user_uuid = '" + req.body.user_uuid + "';";
//     console.log("query:", deleteFile);
//
//     mysqlConnection.userSignup(deleteFile, function (err, result) {
//         if (err) {
//             let msg = "Error Occured. delete once again";
//             jsonResponse = {
//                 "statusCode": 500,
//                 "result": "Error",
//                 "message": msg
//             };
//             res.send(jsonResponse);
//         } else {
//             if (result.affectedRows > 0) {
//                 let msg = "Directory deleted";
//                     jsonResponse = {
//                         "statusCode": 201,
//                         "result": "Success",
//                         "data" : result[0],
//                         "message": msg
//                     };
//                 res.send(jsonResponse);
//                 } else {
//                 let msg = "Error Occured";
//                     jsonResponse = {
//                         "statusCode": 400,
//                         "result": "Error",
//                         "message": msg
//                     };
//                 res.send(jsonResponse);
//             }
//         }
//     });
// }

// exports.starDir_files = function(req, res) {
//
//     let jsonResponse = {};
//     let starQuery = '';
//     if(req.body.file_uuid!== '' && req.body.dir_uuid === ''){
//          starQuery = "update file set star_id='1' where  file_uuid = '"+req.body.file_uuid+"' " +
//             "AND user_uuid = '"+req.body.user_uuid+"';";
//         console.log();
//     } else if(req.body.dir_uuid){
//          starQuery = "update directory set star_id='1' where  dir_uuid = '"+req.body.dir_uuid+"' " +
//             "AND dir_name = '"+req.body.dir_name+"' AND user_uuid = '"+req.body.user_uuid+"';";
//         console.log();
//     }
//     // let starQuery = "insert into star(dir_uuid,user_uuid) values ('"
//     //     + req.body.dir_uuid + "','" + req.body.user_uuid + "');";
//     // console.log("query:", starQuery);
//     //
//     // let mapping_star = "update directory set star_id='yes' where  dir_uuid = '"+req.body.dir_uuid+"' " +
//     //     "AND dir_name = '"+req.body.dir_name+"' AND user_uuid = '"+req.body.user_uuid+"';";
//     // console.log(mapping_star);
//
//     mysqlConnection.userSignup(starQuery, function (err, result) {
//         if (err) {
//             var msg = "Error Occured. Star once again";
//             jsonResponse = {
//                 "statusCode": 500,
//                 "result": "Error",
//                 "message": msg
//             };
//             res.send(jsonResponse);
//         } else {
//             if (result.affectedRows > 0) {
//                 var msg = "Directory starred";
//                 jsonResponse = {
//                     "statusCode": 201,
//                     "result": "Success",
//                     "data" : result[0],
//                     "message": msg
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

// exports.getFiles = function(req, res) {
//
//     let jsonResponse = {};
//     // if(!req.body.user_uuid) {
//     //     req.body.user_uuuid = sessionMgmt.user_uuid;
//     // }
//     // let getAllFiles = " select fdr.user_uuid, d.dir_name,d.dir_uuid, d.star_id, f.file_name, fdr.file_uuid, f.file, " +
//     //         "f.file_created from file_dir_user fdr left join file f on f.file_uuid = fdr.file_uuid " +
//     //         "left join directory d on d.dir_uuid = fdr.dir_uuid where " +
//     //         "fdr.user_uuid = '" + sessionMgmt.user_uuid +  "';";
//
//     let filesArray =[];
//     let getFilesQuery = " select f.file_name, f.file_uuid, f.file_path, f.file_created, f.star_id from file f where f.user_uuid = '" + sessionMgmt.user_uuid +
//                 "' and f.isInDirectory = '0';";
//
//     let dirArray =[];
//     let getDirQuery = " select dir_name, dir_uuid, dir_created, star_id from directory where user_uuid = '" + sessionMgmt.user_uuid +
//         "' and hasFiles = '0';";
//
//     let fileDirArray =[];
//     let fileDirQuery = "select fdr.user_uuid, fdr.dir_uuid, d.dir_created, d.dir_name, f.file_name, fdr.file_uuid, f.file_path," +
//         " f.file_created, d.star_id from file_dir_user fdr left join file f on f.file_uuid = fdr.file_uuid" +
//         " left join directory d on fdr.dir_uuid = d.dir_uuid where fdr.user_uuid = '" + sessionMgmt.user_uuid + "' " +
//         " and f.isInDirectory = '1' and d.hasFiles = '1';";
//
//     let sharedFileArray = [];
//     let SharedFileQuery = "select s.file_uuid, s.shareByUserId, f.file_name, s.file_uuid, f.file_path, f.file_created from share_file s " +
//         "left outer join file f on s.file_uuid = f.file_uuid where s.shareToUserId = '" + sessionMgmt.user_uuid + "';";
//
//
//     let sharedfileDirArray =[];
//     let sharedfileDirQuery = "select sd.shareByUserId, sd.dir_uuid,sd.file_uuid, d.dir_created, d.dir_name, f.file_name, f.file_path,"+
//         "f.file_created from share_dir sd left join file f on f.file_uuid = sd.file_uuid" +
//         " left join directory d on sd.dir_uuid = d.dir_uuid where sd.shareToUserId = '" + sessionMgmt.user_uuid + "';";
//
//
//     let files = [];
//
//
//     mysqlConnection.userSignup(getFilesQuery, function (err, result1) {
//         if (err) {
//             var msg = "Error Occured. Create once again";
//             jsonResponse = {
//                 "statusCode": 500,
//                 "result": "Error",
//                 "message": msg
//             };
//             res.send(jsonResponse);
//         } else {
//             console.log("files are", result1);
//             filesArray = getAllFiles(result1);
//             mysqlConnection.userSignup(SharedFileQuery, function (err, result2) {
//                 if (err) {
//                     var msg = "Error Occured. Create once again";
//                     jsonResponse = {
//                         "statusCode": 500,
//                         "result": "Error",
//                         "message": msg
//                     };
//                     res.send(jsonResponse);
//                 } else {
//                     console.log(" shared files are",result2);
//                     sharedFileArray = getAllShareFiles(result2,sessionMgmt.user_uuid);
//                     mysqlConnection.userSignup(getDirQuery, function (err, result3) {
//                         if (err) {
//                             var msg = "Error Occured. Create once again";
//                             jsonResponse = {
//                                 "statusCode": 500,
//                                 "result": "Error",
//                                 "message": msg
//                             };
//                             res.send(jsonResponse);
//                         } else {
//                             console.log("directories are",result3);
//                             dirArray = getAllDirectory(result3);
//                             mysqlConnection.userSignup(fileDirQuery, function (err, result4) {
//                                 if (err) {
//                                     var msg = "Error Occured. Create once again";
//                                     jsonResponse = {
//                                         "statusCode": 500,
//                                         "result": "Error",
//                                         "message": msg
//                                     };
//                                     res.send(jsonResponse);
//                                 } else {
//                                     console.log("directories are",result4);
//                                     fileDirArray = getFilesAndDirectory(result4);
//                                     mysqlConnection.userSignup(sharedfileDirQuery, function (err, result5) {
//                                         if (err) {
//                                             var msg = "Error Occured. Create once again";
//                                             jsonResponse = {
//                                                 "statusCode": 500,
//                                                 "result": "Error",
//                                                 "message": msg
//                                             };
//                                             res.send(jsonResponse);
//                                         } else {
//                                             console.log("files an dir are", result5);
//                                             sharedfileDirArray = getAllShareDir(result5,sessionMgmt.user_uuid);
//                                             if (filesArray !== undefined) {
//                                                 files = files.concat(filesArray);
//                                             }
//                                             if (sharedFileArray !== undefined) {
//                                                 files = files.concat(sharedFileArray);
//                                             }
//                                             if (dirArray !== undefined) {
//                                                 files = files.concat(dirArray);
//                                             }
//                                             if (fileDirArray !== undefined) {
//                                                 files = files.concat(fileDirArray);
//                                             }
//                                             if (sharedfileDirArray !== undefined) {
//                                                 files = files.concat(sharedfileDirArray);
//                                             }
//                                             // files = files.concat(filesArray, dirArray, fileDirArray);
//                                             jsonResponse = {
//                                                 "statusCode": 201,
//                                                 "result": "Success",
//                                                 "files": files,
//                                                 "msg": ''
//                                             };
//                                             console.log("final array", files);
//                                             res.send(jsonResponse);
//                                         }
//                                     });
//                                 }
//                             });
//                         }
//                     });
//                 }
//             });
//         }
//     });
// }

// getAllFiles = function(result) {
//
//         let json = {};
//         let files = [];
//
//         for (let i = 0; i < result.length; i++) {
//             let filesArray = [];
//             if (result[i].file_name !== null) {
//                 let filejson = {
//                     "file_name": result[i].file_name,
//                     "file_created": result[i].file_created,
//                     "file_path": result[i].file_path,
//                     "file_uuid": result[i].file_uuid
//                 };
//                 filesArray.push(filejson);
//             } else {
//                 filesArray = [];
//             }
//             json = {
//                 "dir_name": '',
//                 "dir_uuid": '',
//                 "dir_created": '',
//                 "star_id": result[i].star_id,
//                 "filesArray": filesArray
//             };
//             files.push(json);
//         }
//         console.log("file json", files);
//     return files;
// }
//
// getAllShareFiles = function(result, current_user){
//     let json = {};
//     let files = [];
//
//     for (let i = 0; i < result.length; i++) {
//         let filesArray = [];
//         let canDelete = false;
//         if(current_user === result[i].shareByUserId){
//             canDelete = true;
//         }
//
//         if (result[i].file_name !== null) {
//             let filejson = {
//                 "file_name": result[i].file_name,
//                 "file_created": result[i].file_created,
//                 "file_path": result[i].file_path,
//                 "file_uuid": result[i].file_uuid
//             };
//             filesArray.push(filejson);
//         } else {
//             filesArray = [];
//         }
//         json = {
//             "dir_name": '',
//             "dir_uuid": '',
//             "dir_created": '',
//             "star_id": '',
//             "isOwner": canDelete,
//             "filesArray": filesArray
//         };
//         files.push(json);
//     }
//     console.log(" share file json", files);
//     return files;
// }
//
// getAllDirectory = function(result){
//     let dir = [];
//     let filesArray = [];
//     for(let i=0; i < result.length; i++){
//         let json = {
//             "dir_name":result[i].dir_name,
//             "dir_uuid":result[i].dir_uuid,
//             "dir_created": result[i].dir_created,
//             "star_id": result[i].star_id,
//             "filesArray": filesArray
//         };
//         dir.push(json);
//     }
//     console.log("dir json",dir);
//     return dir;
// }
//
// getFilesAndDirectory = function(result) {
//     console.log(result);
//     let filesDir = [];
//     let flag = true;
//     for (let i = 0; i < result.length; i++) {
//
//         for (let j = 0; j < filesDir.length; j++) {
//             if (result[i].dir_name !== null && (result[i].dir_name === filesDir[j].dir_name)) {
//                 flag = false;
//                 let filejson1 = {
//                     "file_name": result[i].file_name,
//                     "file_created": result[i].file_created,
//                     "file_path": result[i].file_path,
//                     "file_uuid": result[i].file_uuid
//                 };
//                 // filesArray.push();
//                 var array = [];
//                 array = filesDir[j].filesArray;
//                 array.push(filejson1);
//
//                 filesDir[j].filesArray = array;
//                 break;
//                 // result.splice(i,1);
//                 // i = i-1;
//             }
//             flag = true;
//         }
//
//         if (flag) {
//             let filesArray = [];
//             let filejson = {
//                 "file_name": result[i].file_name,
//                 "file_created": result[i].file_created,
//                 "file_path": result[i].file_path,
//                 "file_uuid": result[i].file_uuid
//             };
//             filesArray.push(filejson);
//
//             let json = {
//                 "dir_name": result[i].dir_name,
//                 "dir_uuid": result[i].dir_uuid,
//                 "star_id": result[i].star_id,
//                 "filesArray": filesArray
//             };
//             filesDir.push(json);
//         }
//         console.log("fir & dir json",filesDir);
//     }
//     return filesDir;
// }
//
// getAllShareDir = function(result,current_user) {
//     console.log(result);
//     let filesDir = [];
//     let flag = true;
//     for (let i = 0; i < result.length; i++) {
//         let canDelete = false;
//         if(current_user === result[i].shareByUserId){
//             canDelete = true;
//         }
//         for (let j = 0; j < filesDir.length; j++) {
//             if (result[i].dir_name !== null && (result[i].dir_name === filesDir[j].dir_name)) {
//                 flag = false;
//                 let filejson1 = {
//                     "file_name": result[i].file_name,
//                     "file_created": result[i].file_created,
//                     "file_path": result[i].file_path,
//                     "file_uuid": result[i].file_uuid
//                 };
//                 // filesArray.push();
//                 var array = [];
//                 array = filesDir[j].filesArray;
//                 array.push(filejson1);
//
//                 filesDir[j].filesArray = array;
//                 break;
//                 // result.splice(i,1);
//                 // i = i-1;
//             }
//             flag = true;
//         }
//
//         if (flag) {
//             let filesArray = [];
//             let filejson = {
//                 "file_name": result[i].file_name,
//                 "file_created": result[i].file_created,
//                 "file_path": result[i].file_path,
//                 "file_uuid": result[i].file_uuid
//             };
//             filesArray.push(filejson);
//
//             let json = {
//                 "dir_name": result[i].dir_name,
//                 "dir_uuid": result[i].dir_uuid,
//                 "star_id": '',
//                 "isOwnerDir": canDelete,
//                 "filesArray": filesArray
//             };
//             filesDir.push(json);
//         }
//         console.log("fir & dir shared json",filesDir);
//     }
//     return filesDir;
// }

// exports.deleteFileInDir = function(req,res) {
//     let jsonResponse = {};
//
//     let deleteFileQuery = "delete from file where file_uuid = '" + req.body.file_uuid + "' AND " +
//         "user_uuid = '" + req.body.user_uuid + "';";
//     console.log("query:", deleteFileQuery);
//
//     let mapping_deleteDirQuery = "delete from file_dir_user where file_uuid = '"+ req.body.file_uuid + "' and " +
//     "user_uuid = '" + req.body.user_uuid + "' AND dir_uuid = '" + req.body.dir_uuid + "';";
//
//     console.log("query:", mapping_deleteDirQuery);
//
//     mysqlConnection.userSignup(deleteFileQuery, function (err, result) {
//         if (err) {
//             let msg = "Error Occured. delete once again";
//             jsonResponse = {
//                 "statusCode": 500,
//                 "result": "Error",
//                 "message": msg
//             };
//             res.send(jsonResponse);
//         } else {
//             if (result.affectedRows > 0) {
//                 mysqlConnection.userSignup(mapping_deleteDirQuery, function (err, result1) {
//                     if (result1.affectedRows > 0) {
//
//                         if(req.body.file.length === 1) {
//                             let updateFileQuery = "update directory set hasFiles='0' where  dir_uuid = '"+req.body.dir_uuid+"' " +
//                                 "AND user_uuid = '"+req.body.user_uuid+"';";
//                             console.log("query:", updateFileQuery);
//                             mysqlConnection.userSignup(updateFileQuery, function (err, result) {
//                                 if (err) {
//                                     let msg = "Error Occured. delete once again";
//                                     jsonResponse = {
//                                         "statusCode": 500,
//                                         "result": "Error",
//                                         "message": msg
//                                     };
//                                     res.send(jsonResponse);
//                                 }
//                             });
//                         }
//                         var msg = "Directory deleted";
//                         jsonResponse = {
//                             "statusCode": 201,
//                             "result": "Success",
//                             "data" : result1[0],
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
//             } else {
//                 var msg = "File deleted";
//                 jsonResponse = {
//                     "statusCode": 201,
//                     "result": "Success",
//                     "data" : result[0],
//                     "message": msg
//                 };
//                 res.send(jsonResponse);
//             }
//
//         }
//     });
//
// }

// exports.shareFile = function(req,res) {
//     let jsonResponse = {};
//     let file = req.body.file;
//
//     let getUserIdToShare = "select user_uuid from user where email = '" + req.body.shareToEmail + "';";
//     mysqlConnection.userSignup(getUserIdToShare, function (err, result) {
//         if (err) {
//             var msg = "Error Occured";
//             jsonResponse = {
//                 "statusCode": 500,
//                 "result": "Error",
//                 "message": msg
//             };
//             res.send(jsonResponse);
//         } else if(result.length === 0){
//             var msg = "User is not available in dropbox";
//             jsonResponse = {
//                 "statusCode": 300,
//                 "result": "Error",
//                 "message": msg
//             };
//             res.send(jsonResponse);
//         }else if(result.length >0){
//             let insertShareFile = "insert into share_file(file_uuid,shareToUserId,shareByUserId) values ('"
//                 + file.filesArray[0].file_uuid + "','" + result[0].user_uuid + "','" + req.body.user_uuid + "');";
//             mysqlConnection.userSignup(insertShareFile, function (err, result) {
//                 if (err) {
//                     var msg = "Share file failed";
//                     jsonResponse = {
//                         "statusCode": 500,
//                         "result": "Error",
//                         "message": msg
//                     };
//                     res.send(jsonResponse);
//                 } else {
//                     var msg = "Share file success";
//                     jsonResponse = {
//                         "statusCode": 201,
//                         "result": "Error",
//                         "message": msg
//                     };
//                     res.send(jsonResponse);
//                 }
//             });
//         }
//     });
// }

// exports.shareDir =function(req,res){
//     let jsonResponse = {};
//     let file = req.body.file;
//     // console.log("req.body",JSON.stringify(req.body));
//     let getUserIdToShare = "select user_uuid from user where email = '" + req.body.shareToEmail + "';";
//     mysqlConnection.userSignup(getUserIdToShare, function (err, result) {
//         if (err) {
//             var msg = "Error Occured";
//             jsonResponse = {
//                 "statusCode": 500,
//                 "result": "Error",
//                 "message": msg
//             };
//             res.send(jsonResponse);
//         } else if(result.length === 0){
//             var msg = "User is not available in dropbox";
//             jsonResponse = {
//                 "statusCode": 300,
//                 "result": "Error",
//                 "message": msg
//             };
//             res.send(jsonResponse);
//         }else if(result.length >0){
//             console.log(result);
//             if(file.filesArray.length > 0 ){
//                 let x = false;
//                 for(let i = 0; i<file.filesArray.length ;i++){
//                     let insertShareDir = "insert into share_dir(dir_uuid,file_uuid,shareToUserId,shareByUserId) " +
//                         "values ('" + file.dir_uuid + "','" + file.filesArray[i].file_uuid+ "','" + result[0].user_uuid +
//                         "','" + req.body.user_uuid + "');";
//                     console.log("insertShareDir is:", insertShareDir);
//                     mysqlConnection.userSignup(insertShareDir, function (err, result1) {
//                         if (err) {
//                             var msg = "Share Folder failed";
//                             jsonResponse = {
//                                 "statusCode": 500,
//                                 "result": "Error",
//                                 "message": msg
//                             };
//                             res.send(jsonResponse);
//                         } else {
//                             console.log("All Done");
//                         }
//                     });
//                     if(i === file.filesArray.length-1) {
//                         x = true;
//                     }
//                 }
//                 if(x){
//                     var msg = "Share Folder success";
//                     jsonResponse = {
//                         "statusCode": 201,
//                         "result": "Success",
//                         "message": msg
//                     };
//                     res.send(jsonResponse);
//                 }
//             } else {
//                 var msg = "Share Folder failed";
//                 jsonResponse = {
//                     "statusCode": 500,
//                     "result": "Error",
//                     "message": msg
//                 };
//                 res.send(jsonResponse);
//             }
//         }
//     });
// }

// exports.shareLink = function(req,res){
//     let jsonResponse = {};
//     let file = req.body.file;
//
//     let getUserIdToShareLink = "select user_uuid from user where email = '" + req.body.shareToEmail + "';";
//     mysqlConnection.userSignup(getUserIdToShareLink, function (err, result) {
//         if (err) {
//             var msg = "Error Occured";
//             jsonResponse = {
//                 "statusCode": 500,
//                 "result": "Error",
//                 "message": msg
//             };
//             res.send(jsonResponse);
//         } else if(result.length === 0){
//             var msg = "User is not available in dropbox";
//             jsonResponse = {
//                 "statusCode": 300,
//                 "result": "Error",
//                 "message": msg
//             };
//             res.send(jsonResponse);
//         }else if(result.length >0){
//             let insertShareLink = "insert into link(link,user_uuid) values ('"
//                 + file.filesArray[0].file_path + "','" + result[0].user_uuid + "');";
//             mysqlConnection.userSignup(insertShareLink, function (err, result) {
//                 if (err) {
//                     var msg = "Share link failed";
//                     jsonResponse = {
//                         "statusCode": 500,
//                         "result": "Error",
//                         "message": msg
//                     };
//                     res.send(jsonResponse);
//                 } else {
//                     var msg = "Share file success";
//                     jsonResponse = {
//                         "statusCode": 201,
//                         "result": "Error",
//                         "message": msg
//                     };
//                     res.send(jsonResponse);
//                 }
//             });
//         }
//     });
// }

//MONGO code
exports.getFiles = function(req, res) {

    let topic= "login_topic";
    req.body.api = "getFiles";
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
    // let files = [];
    // mongo.connect(mongoLogin, function (mongoConn) {
    //     console.log('Connected to mongo at: ' + mongoLogin);
    //
    //     let collection = mongoConn.collection('files');
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
    //                 "files": result,
    //                 "message": msg
    //             };
    //             res.send(jsonResponse);
    //         } else {
    //             var msg = "";
    //             jsonResponse = {
    //                 "statusCode": 201,
    //                 "result": "success",
    //                 "files": files,
    //                 "message": msg
    //             };
    //             res.send(jsonResponse);
    //         }
    //     });
    // });
}

exports.createDirectory = function(req, res) {
    //assigning unique id to  directory
    let uuidv4 = uuid();
    console.log(uuidv4);
    let dir_created_timestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    let jsonResponse = {};

    mongo.connect(mongoLogin, function (mongoConn) {
        console.log('Connected to mongo at: ' + mongoLogin);

        let collection = mongoConn.collection('files');
        let payload = {
            "user_uuid" : [sessionMgmt.user_uuid],
            "dir_name" : req.body.dir_name,
            "dir_uuid" : uuidv4,
            "dir_created": dir_created_timestamp,
            "star_id" : '0',
            "owner_uuid" : sessionMgmt.user_uuid,
            "filesArray" : []
        }
        collection.insert(payload, function (err, result) {
            // console.log("file result is", result);
            if (err) {
                var msg = "Error Occured. Create once again";
                jsonResponse = {
                    "statusCode": 500,
                    "result": "Error",
                    "message": msg
                };
                res.send(jsonResponse);
            } else {
                if (result!==null) {
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
    });
}

exports.deleteFile = function(req,res) {

    let jsonResponse = {};

    mongo.connect(mongoLogin, function (mongoConn) {
        console.log('Connected to mongo at: ' + mongoLogin);

        let collection = mongoConn.collection('files');
        let id = "ObjectId('"+req.body._id+"')";
        console.log("id is",id);
        collection.remove({ "_id" : new mongodb.ObjectID(req.body._id)}, function (err, result) {
            // console.log("file result is", result);
            if (err) {
                let msg = "Error Occured. delete once again";
                jsonResponse = {
                    "statusCode": 500,
                    "result": "Error",
                    "message": msg
                };
                res.send(jsonResponse);
            } else {
                if (result!==null) {
                    let msg = "file deleted";
                    jsonResponse = {
                        "statusCode": 201,
                        "result": "Success",
                        "data" : result,
                        "message": msg
                    };
                    console.log(jsonResponse)
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
    });
}

exports.shareLink = function(req,res){
    let jsonResponse = {};
    let file = req.body.file;

    mongo.connect(mongoLogin, function(){
        console.log('Connected to mongo at: ' + mongoLogin);
        let collection = mongo.collection('user');
        let collectionLink = mongo.collection('link');

        collection.findOne({email: req.body.shareToEmail }, function(err, result){
            if(err){
                var msg = "Error Occured";
                jsonResponse = {
                    "statusCode": 500,
                    "result": "Error",
                    "message": msg
                };
                res.send(jsonResponse);
            }
            else if (result === null) {
                var msg = "User is not available in dropbox";
                jsonResponse = {
                    "statusCode": 300,
                    "result": "Error",
                    "message": msg
                };
                res.send(jsonResponse);
            } else if(result){
                let data = {
                    "user_uuid":result.user_uuid,
                    "link":file.filesArray[0].file_path
                }
                collectionLink.insert(data , function(err,result1){
                    if (err) {
                        var msg = "Share link failed";
                        jsonResponse = {
                            "statusCode": 500,
                            "result": "Error",
                            "message": msg
                        };
                        res.send(jsonResponse);
                    } else {
                        var msg = "Share file success";
                        jsonResponse = {
                            "statusCode": 201,
                            "result": "Error",
                            "message": msg
                        };
                        res.send(jsonResponse);
                    }
                });
            }
        });
    });
}

exports.starDir_files = function(req, res) {

    let jsonResponse = {};

    mongo.connect(mongoLogin, function (mongoConn) {

        let collection = mongoConn.collection('files');
        collection.update({ "_id" : new mongodb.ObjectID(req.body._id)},
            {$set:{"star_id": "1" }}, function (err, result) {
                if (err) {
                    var msg = "Error Occured. Star once again";
                    jsonResponse = {
                        "statusCode": 500,
                        "result": "Error",
                        "message": msg
                    };
                    res.send(jsonResponse);
                } else {
                    if(result.result.nModified > 0){
                        var msg = "File/Directory starred";
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
    });
}

exports.shareFile = function(req,res) {
    let jsonResponse = {};
    let file = req.body.file;

    mongo.connect(mongoLogin, function(){
        console.log('Connected to mongo at: ' + mongoLogin);
        let collection = mongo.collection('user');
        let collectionFile = mongo.collection('files');

        collection.findOne({email: req.body.shareToEmail }, function(err, result){
            if(err){
                var msg = "Error Occured";
                jsonResponse = {
                    "statusCode": 500,
                    "result": "Error",
                    "message": msg
                };
                res.send(jsonResponse);
            }
            else if (result === null) {
                var msg = "User is not available in dropbox";
                jsonResponse = {
                    "statusCode": 300,
                    "result": "Error",
                    "message": msg
                };
                res.send(jsonResponse);
            } else if (result) {
                collectionFile.update({ "_id" : new mongodb.ObjectID(req.body._id)},
                    {$push:{"user_uuid": result.user_uuid }}, function (err, result1) {
                        console.log("result is", result1);
                        if (err) {
                            var msg = "Share file failed";
                            jsonResponse = {
                                "statusCode": 500,
                                "result": "Error",
                                "message": msg
                            };
                            res.send(jsonResponse);
                        } else {
                            if(result1.result.nModified > 0){
                                var msg = "Share file success";
                                jsonResponse = {
                                    "statusCode": 201,
                                    "result": "Success",
                                    "message": msg
                                };
                                res.send(jsonResponse);
                            } else {
                                var msg = "Error Occured";
                                jsonResponse = {
                                    "statusCode": 500,
                                    "result": "Error",
                                    "message": msg
                                };
                                res.send(jsonResponse);
                            }
                        }
                    });
            }
        });
    });
}

exports.deleteDirectory = function(req, res) {
    let jsonResponse = {};

    mongo.connect(mongoLogin, function (mongoConn) {
        console.log('Connected to mongo at: ' + mongoLogin);

        let collection = mongoConn.collection('files');
        let id = "ObjectId('"+req.body._id+"')";
        console.log("id is",id);
        collection.remove({ "_id" : new mongodb.ObjectID(req.body._id)}, function (err, result) {
            // console.log("file result is", result);
            if (err) {
                let msg = "Error Occured. delete once again";
                jsonResponse = {
                    "statusCode": 500,
                    "result": "Error",
                    "message": msg
                };
                res.send(jsonResponse);
            } else {
                if (result!==null) {
                    let msg = "directory deleted";
                    jsonResponse = {
                        "statusCode": 201,
                        "result": "Success",
                        "data" : result,
                        "message": msg
                    };
                    console.log(jsonResponse)
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
    });
}

exports.shareDir =function(req,res){
    let jsonResponse = {};
    let file = req.body.file;

    mongo.connect(mongoLogin, function(){
        console.log('Connected to mongo at: ' + mongoLogin);
        let collection = mongo.collection('user');
        let collectionFile = mongo.collection('files');

        collection.findOne({email: req.body.shareToEmail }, function(err, result){
            if(err){
                var msg = "Error Occured";
                jsonResponse = {
                    "statusCode": 500,
                    "result": "Error",
                    "message": msg
                };
                res.send(jsonResponse);
            }
            else if (result === null) {
                var msg = "User is not available in dropbox";
                jsonResponse = {
                    "statusCode": 300,
                    "result": "Error",
                    "message": msg
                };
                res.send(jsonResponse);
            } else if (result) {
                collectionFile.update({ "_id" : new mongodb.ObjectID(req.body._id)},
                    {$push:{"user_uuid": result.user_uuid }}, function (err, result1) {
                        console.log("result is", result1);
                        if (err) {
                            var msg = "Share folder failed";
                            jsonResponse = {
                                "statusCode": 500,
                                "result": "Error",
                                "message": msg
                            };
                            res.send(jsonResponse);
                        } else {
                            if(result1.result.nModified > 0){
                                var msg = "Share folder success";
                                jsonResponse = {
                                    "statusCode": 201,
                                    "result": "Success",
                                    "message": msg
                                };
                                res.send(jsonResponse);
                            } else {
                                var msg = "Error Occured";
                                jsonResponse = {
                                    "statusCode": 500,
                                    "result": "Error",
                                    "message": msg
                                };
                                res.send(jsonResponse);
                            }
                        }
                    });
            }
        });
    });

}

exports.deleteFileInDir = function(req,res) {
    let jsonResponse = {};

    mongo.connect(mongoLogin, function (mongoConn) {
        console.log('Connected to mongo at: ' + mongoLogin);

        let collection = mongoConn.collection('files');

            collection.update({"_id" : new mongodb.ObjectID(req.body._id)},
                { $pull: { filesArray: {file_uuid : req.body.file_uuid }}}, function (err, result) {
            // console.log("file result is", result);
            if (err) {
                let msg = "Error Occured. delete once again";
                jsonResponse = {
                    "statusCode": 500,
                    "result": "Error",
                    "message": msg
                };
                res.send(jsonResponse);
            } else {
                if (result!==null) {
                    let msg = "directory deleted";
                    jsonResponse = {
                        "statusCode": 201,
                        "result": "Success",
                        "data" : result,
                        "message": msg
                    };
                    console.log(jsonResponse)
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
    });
}

