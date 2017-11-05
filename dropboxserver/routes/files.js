/**
 * Created by ManaliJain on 10/5/17.
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var uuid = require('uuid/v4');
var moment = require('moment');
var sessionMgmt = require('./sessionManagement');
var mysqlConnection = require('./mysqlConnector');

var mongo = require("./mongoConnector");
var mongodb = require('mongodb');
var mongoLogin = "mongodb://localhost:27017/Dropboxuser";
var kafkaConnect = require('./kafkaConnect');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        console.log(file);
        // http://localhost:3003/1507751921274Resume_Manali_Jain.pdf
        callback(null, path.join(__dirname, "/../public"))
    },
    filename: function (req, file, callback) {

        console.log("filename", file.originalname);
        let uuidv4 = uuid();
        console.log(uuidv4);
        let filename = Date.now() + file.originalname;
        let filePath = "http://localhost:3003/" + filename;
        insertFile(file, filePath,sessionMgmt.user_uuid, uuidv4);
        req.file_uuid = uuidv4;
        callback(null, filename);
    }
}
);

const upload = multer({ storage: storage }).single('file');

exports.saveFile = function (req,res) {
    upload(req, res, function (err) {
        console.log("file_uuid is jhjkgjkhjkhjhk", req.file_uuid);
        if(err){
            console.log(err);
            let msg = "Error occured";
            let jsonResponse = {
                "statusCode": 500,
                "result": "error",
                "message": msg
            };
            res.status(500).json({jsonResponse});
        }else{
           console.log("From save file: ")
            // let msg = "saved successfully";
            // let jsonResponse = {
            //     "statusCode": 201,
            //     "result": "Success",
            //     "message": msg
            // };
            // res.send(jsonResponse);
            res.status(201).json({file_uuid : req.file_uuid});
        }
    })
};

const storageGroup = multer.diskStorage({
        destination: function (req, file, callback) {
            console.log(file);
            // http://localhost:3003/1507751921274Resume_Manali_Jain.pdf
            callback(null, path.join(__dirname, "/../public/"))
        },
        filename: function (req, file, callback) {

            console.log("filename", file.originalname);
            let uuidv4 = uuid();
            console.log(uuidv4);
            let filename = Date.now() + file.originalname;
            let filePath = "http://localhost:3003/" + filename;
            insertFileGroupAndDIR(file, filePath,sessionMgmt.user_uuid, uuidv4);
            req.file_uuid = uuidv4;
            callback(null, filename);
        }
    }
);

const uploadGroup = multer({ storage: storageGroup }).single('file');

exports.saveFileGroup = function (req,res) {
    uploadGroup(req, res, function (err) {
        console.log("file_uuid is jhjkgjkhjkhjhk", req.file_uuid);
        if(err){
            console.log(err);
            let msg = "Error occured";
            let jsonResponse = {
                "statusCode": 500,
                "result": "error",
                "message": msg
            };
            res.status(500).json({jsonResponse});
        }else{
            console.log("From save file: ")
            res.status(201).json({file_uuid : req.file_uuid});
        }
    })
};

// insertFile = function (file, filePath, user_uuid, uuidv4) {
//
//     var file_created_timestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
//
//     let insertFileQuery = "insert into file(file_uuid,file_created,file_name,file_type,user_uuid,isInDirectory," +
//         "star_id,file_path) values ('" + uuidv4 + "','" + file_created_timestamp + "','" + file.originalname + "','"
//         + file.mimetype + "','" +  user_uuid + "', '0', '0', '" + filePath + "');";
//     console.log("query:", insertFileQuery);
//
//     // let mappingFile_User = "insert into file_dir_user(file_uuid,user_uuid) values ('"
//     //     + uuidv4 + "','" + user_uuid +"');";
//     //
//     // console.log("query:", mappingFile_User);
//     // let mapping_star = "update directory set star_id='yes' where  dir_uuid = '"+req.body.dir_uuid+"' " +
//     //     "AND dir_name = '"+req.body.dir_name+"' AND user_uuid = '"+req.body.user_uuid+"';";
//     // console.log(mapping_star);
//
//     mysqlConnection.userSignup(insertFileQuery, function (err, result) {
//         console.log('RESULT Is', result);
//         if (err) {
//             throw err;
//         }
//     });
// };

// exports.uploadFileInDir = function(req,res) {
//     let jsonResponse = {};
//
//     let fileDirMappingQuery = "insert into file_dir_user(dir_uuid,file_uuid,user_uuid) values (" +
//     "'" + req.body.dir_uuid + "','" + req.body.file_uuid + "','" + req.body.user_uuid + "');";
//     console.log(fileDirMappingQuery);
//
//     let fileUpdateQuery = "update file set isInDirectory='1' where  file_uuid = '"+req.body.file_uuid+"' " +
//         "AND user_uuid = '"+req.body.user_uuid+"';";
//     console.log(fileUpdateQuery);
//
//     let dirUpdateQuery = "update directory set hasFiles='1' where  dir_uuid = '"+req.body.dir_uuid+"' " +
//         "AND user_uuid = '"+req.body.user_uuid+"';";
//     console.log(dirUpdateQuery);
//
//
//     mysqlConnection.userSignup(fileDirMappingQuery, function (err, result1) {
//         console.log("inside forst");
//         if (err) {
//             var msg = "Error Occured. upload once again";
//             jsonResponse = {
//                 "statusCode": 500,
//                 "result": "Error",
//                 "message": msg
//             };
//             res.send(jsonResponse);
//         } else {
//             mysqlConnection.userSignup(fileUpdateQuery, function (err, result2) {
//                 console.log("inside second");
//                 if (err) {
//                     var msg = "Error Occured";
//                     jsonResponse = {
//                         "statusCode": 500,
//                         "result": "Error",
//                         "message": msg
//                     };
//                     res.send(jsonResponse);
//                 } else {
//                     mysqlConnection.userSignup(dirUpdateQuery, function (err, result3) {
//                         console.log("inside third");
//                         if (err) {
//                             var msg = "Error Occured";
//                             jsonResponse = {
//                                 "statusCode": 500,
//                                 "result": "Error",
//                                 "message": msg
//                             };
//                             res.send(jsonResponse);
//                         } else {
//                             jsonResponse = {
//                                 "statusCode": 201,
//                                 "result": "Success",
//                                 "msg" : ''
//                             };
//                             res.send(jsonResponse);
//                         }
//                     });
//                 }
//             });
//         }
//     });
// }

// insertFileGroup = function (file, filePath, user_uuid, uuidv4) {
//
//     var file_creation_timestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
//
//     let insertFileGroupQuery = "insert into file_in_group(file_uuid,file_created,file_name,file_path,file_owner)" +
//         " values ('" + uuidv4 + "','" + file_creation_timestamp + "','" + file.originalname + "','"
//         + filePath + "','" +  user_uuid + "');";
//     console.log("query:", insertFileGroupQuery);
//
//     mysqlConnection.userSignup(insertFileGroupQuery, function (err, result) {
//         console.log('RESULT Is', result);
//         if (err) {
//             throw err;
//         }
//     });
// };

// exports.uploadFileInGroup = function(req,res){
//     let jsonResponse = {};
//
//     let fileGroupQuery = "update file_in_group set group_name='" + req.body.group_name + "', group_uuid ='" + req.body.group_uuid + "'"+
//     "where  file_uuid = '"+req.body.file_uuid+"' AND file_owner ='"+req.body.user_uuid+"';";
//
//     console.log(fileGroupQuery);
//
//     mysqlConnection.userSignup(fileGroupQuery, function (err, result) {
//         if (err) {
//             var msg = "Error Occured. upload once again";
//             jsonResponse = {
//                 "statusCode": 500,
//                 "result": "Error",
//                 "message": msg
//             };
//             res.send(jsonResponse);
//         } else if (result.affectedRows > 0) {
//             jsonResponse = {
//                 "statusCode": 201,
//                 "result": "Success",
//                 "msg": ''
//             };
//             res.send(jsonResponse);
//         } else {
//             var msg = "Error Occured";
//             jsonResponse = {
//                 "statusCode": 500,
//                 "result": "Error",
//                 "message": msg
//             };
//             res.send(jsonResponse);
//         }
//     });
// }

//MONGO code

insertFile = function (file, filePath, user_uuid, uuidv4) {

    let topic= "request_topic";
    let req = {
        body:{}
    };
    req.body.category = "files";
    req.body.api = "insertFile";
    req.body.user_uuid = user_uuid;
    req.body.file = file;
    req.body.filePath = filePath;
    req.body.uuid = uuidv4;
    kafkaConnect.getKafkaConnection(topic, req, function(err,response){
        console.log("response of dropbox user is", response);
    });

    // let file_created_timestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    //
    // mongo.connect(mongoLogin, function (mongoConn) {
    //     console.log('Connected to mongo at: ' + mongoLogin);
    //
    //     let collection = mongoConn.collection('files');
    //     let payload = {
    //         "user_uuid" : [sessionMgmt.user_uuid],
    //         "dir_name" : '',
    //         "dir_uuid" : '',
    //         "dir_created": '',
    //         "star_id" : '0',
    //         "owner_uuid" : sessionMgmt.user_uuid,
    //         "filesArray" : [{
    //             "file_uuid": uuidv4,
    //             "file_created" : file_created_timestamp,
    //             "file_name": file.originalname,
    //             "file_type": file.mimetype,
    //             "file_path" : filePath
    //         }]
    //     }
    //     collection.insert(payload, function (err, result) {
    //         // console.log("file result is", result);
    //         if (err) {
    //             throw err;
    //         }
    //     });
    // });
};

insertFileGroupAndDIR = function (file, filePath, user_uuid, uuidv4) {


    let topic= "request_topic";
    let req = {
        body:{}
    };
    req.body.category = "files";
    req.body.api = "insertFileGroupAndDIR";
    req.body.user_uuid = user_uuid;
    req.body.file = file;
    req.body.filePath = filePath;
    req.body.file_uuid = uuidv4;
    kafkaConnect.getKafkaConnection(topic, req, function(err,response){
        console.log("response of dropbox user is", response);
    });

    // var file_creation_timestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    //
    // mongo.connect(mongoLogin, function (mongoConn) {
    //     console.log('Connected to mongo at: ' + mongoLogin);
    //
    //     let collection = mongoConn.collection('filesTemp');
    //     let payload = {
    //             "file_uuid": uuidv4,
    //             "file_created" : file_creation_timestamp,
    //             "file_name": file.originalname,
    //             "file_type": file.mimetype,
    //             "file_path" : filePath
    //     }
    //     collection.insert(payload, function (err, result) {
    //         // console.log("file result is", result);
    //         if (err) {
    //             throw err;
    //         }
    //     });
    // });
};

exports.uploadFileInDir = function(req,res) {

    let topic= "request_topic";
    req.body.category = "files";
    req.body.api = "uploadFileInDir";
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
    // mongo.connect(mongoLogin, function(){
    //     console.log('Connected to mongo at: ' + mongoLogin);
    //     let collectionFile = mongo.collection('filesTemp');
    //     let collection = mongo.collection('files');
    //
    //     collectionFile.findOne({file_uuid: req.body.file_uuid}, function(err, result){
    //         console.log("result is123",result);
    //         if(err){
    //             var msg = "Error Occured";
    //             jsonResponse = {
    //                 "statusCode": 500,
    //                 "result": "Error",
    //                 "message": msg
    //             };
    //             res.send(jsonResponse);
    //         }
    //         else if (result === null) {
    //             var msg = "Upload Error";
    //             jsonResponse = {
    //                 "statusCode": 300,
    //                 "result": "Error",
    //                 "message": msg
    //             };
    //             res.send(jsonResponse);
    //         } else if (result) {
    //             collection.update({ "_id" : new mongodb.ObjectID(req.body._id)},
    //                 {$push:{"filesArray": result }}, function (err, result1) {
    //                     console.log("result is", result1);
    //                     if (err) {
    //                         var msg = "Upload Error";
    //                         jsonResponse = {
    //                             "statusCode": 500,
    //                             "result": "Error",
    //                             "message": msg
    //                         };
    //                         res.send(jsonResponse);
    //                     } else {
    //                         if(result1.result.nModified > 0){
    //                             jsonResponse = {
    //                                 "statusCode": 201,
    //                                 "result": "Success",
    //                                 "msg" : ''
    //                             };
    //                             res.send(jsonResponse);
    //                         } else {
    //                             var msg = "Upload Error";
    //                             jsonResponse = {
    //                                 "statusCode": 500,
    //                                 "result": "Error",
    //                                 "message": msg
    //                             };
    //                             res.send(jsonResponse);
    //                         }
    //                     }
    //                 });
    //         }
    //     });
    // });
}

exports.uploadFileInGroup = function(req,res){

    let topic= "request_topic";
    req.body.category = "files";
    req.body.api = "uploadFileInGroup";
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
    // mongo.connect(mongoLogin, function(){
    //     console.log('Connected to mongo at: ' + mongoLogin);
    //     let collectionFile = mongo.collection('filesTemp');
    //     let collection = mongo.collection('groups');
    //
    //     collectionFile.findOne({file_uuid: req.body.file_uuid}, function(err, result){
    //         if(err){
    //             var msg = "Error Occured. upload once again";
    //             jsonResponse = {
    //                 "statusCode": 500,
    //                 "result": "Error",
    //                 "message": msg
    //             };
    //             res.send(jsonResponse);
    //         }
    //         else if (result === null) {
    //             var msg = "Upload Error";
    //             jsonResponse = {
    //                 "statusCode": 500,
    //                 "result": "Error",
    //                 "message": msg
    //             };
    //             res.send(jsonResponse);
    //         } else if (result) {
    //             collection.update({ "_id" : new mongodb.ObjectID(req.body._id)},
    //                 {$push:{"filesArray": result }}, function (err, result1) {
    //                     if (err) {
    //                         var msg = "Error Occured. upload once again";
    //                         jsonResponse = {
    //                             "statusCode": 500,
    //                             "result": "Error",
    //                             "message": msg
    //                         };
    //                         res.send(jsonResponse);
    //                     } else {
    //                         if(result1.result.nModified > 0){
    //                             jsonResponse = {
    //                                 "statusCode": 201,
    //                                 "result": "Success",
    //                                 "msg" : ''
    //                             };
    //                             res.send(jsonResponse);
    //                         } else {
    //                             var msg = "Upload Error";
    //                             jsonResponse = {
    //                                 "statusCode": 500,
    //                                 "result": "Error",
    //                                 "message": msg
    //                             };
    //                             res.send(jsonResponse);
    //                         }
    //                     }
    //                 });
    //         }
    //     });
    // });
}
