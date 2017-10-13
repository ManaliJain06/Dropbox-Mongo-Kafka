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

insertFile = function (file, filePath, user_uuid, uuidv4) {

    var file_created_timestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    let insertFileQuery = "insert into file(file_uuid,file_created,file_name,file_type,user_uuid,isInDirectory," +
        "star_id,file_path) values ('" + uuidv4 + "','" + file_created_timestamp + "','" + file.originalname + "','"
        + file.mimetype + "','" +  user_uuid + "', '0', '0', '" + filePath + "');";
    console.log("query:", insertFileQuery);

    // let mappingFile_User = "insert into file_dir_user(file_uuid,user_uuid) values ('"
    //     + uuidv4 + "','" + user_uuid +"');";
    //
    // console.log("query:", mappingFile_User);
    // let mapping_star = "update directory set star_id='yes' where  dir_uuid = '"+req.body.dir_uuid+"' " +
    //     "AND dir_name = '"+req.body.dir_name+"' AND user_uuid = '"+req.body.user_uuid+"';";
    // console.log(mapping_star);

    mysqlConnection.userSignup(insertFileQuery, function (err, result) {
        console.log('RESULT Is', result);
        if (err) {
            throw err;
        }
    });
};

exports.uploadFileInDir = function(req,res) {
    let jsonResponse = {};

    let fileDirMappingQuery = "insert into file_dir_user(dir_uuid,file_uuid,user_uuid) values (" +
    "'" + req.body.dir_uuid + "','" + req.body.file_uuid + "','" + req.body.user_uuid + "');";
    console.log(fileDirMappingQuery);

    let fileUpdateQuery = "update file set isInDirectory='1' where  file_uuid = '"+req.body.file_uuid+"' " +
        "AND user_uuid = '"+req.body.user_uuid+"';";
    console.log(fileUpdateQuery);

    let dirUpdateQuery = "update directory set hasFiles='1' where  dir_uuid = '"+req.body.dir_uuid+"' " +
        "AND user_uuid = '"+req.body.user_uuid+"';";
    console.log(dirUpdateQuery);


    mysqlConnection.userSignup(fileDirMappingQuery, function (err, result1) {
        console.log("inside forst");
        if (err) {
            var msg = "Error Occured. upload once again";
            jsonResponse = {
                "statusCode": 500,
                "result": "Error",
                "message": msg
            };
            res.send(jsonResponse);
        } else {
            mysqlConnection.userSignup(fileUpdateQuery, function (err, result2) {
                console.log("inside second");
                if (err) {
                    var msg = "Error Occured";
                    jsonResponse = {
                        "statusCode": 500,
                        "result": "Error",
                        "message": msg
                    };
                    res.send(jsonResponse);
                } else {
                    mysqlConnection.userSignup(dirUpdateQuery, function (err, result3) {
                        console.log("inside third");
                        if (err) {
                            var msg = "Error Occured";
                            jsonResponse = {
                                "statusCode": 500,
                                "result": "Error",
                                "message": msg
                            };
                            res.send(jsonResponse);
                        } else {
                            jsonResponse = {
                                "statusCode": 201,
                                "result": "Success",
                                "msg" : ''
                            };
                            res.send(jsonResponse);
                        }
                    });
                }
            });
        }
    });
}

