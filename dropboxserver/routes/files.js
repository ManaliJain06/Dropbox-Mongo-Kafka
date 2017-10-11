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
        // console.log("variable is", sessionMgmt.user_uuid);
        let uuidv4 = uuid();
        console.log(uuidv4);
        insertFile(file,sessionMgmt.user_uuid,uuidv4);
        // var path = path.join(__dirname, "/../public") + Date.now()+file.originalname;
        // console.log(path);
        callback(null, path.join(__dirname, "/../public"))
    },
    filename: function (req, file, callback) {
        console.log("filename", file.originalname);
        callback(null, Date.now()+file.originalname)
    }
});

const upload = multer({ storage: storage }).single('file');

exports.saveFile = function (req,res) {
    upload(req, res, function (err) {
        if(err){
            console.log(err);
            var msg = "Error occured";
            var jsonResponse = {
                "statusCode": 500,
                "result": "error",
                "message": msg
            };
            res.send(jsonResponse);
        }else{
           console.log("From save file: ")
            var msg = "saved successfully";
            var jsonResponse = {
                "statusCode": 201,
                "result": "Success",
                "message": msg
            };
            res.send(jsonResponse);
        }
    })
};

insertFile = function (file, user_uuid, uuidv4) {

    var file_created_timestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    let insertFileQuery = "insert into file(file_uuid,file,file_created,file_name,file_type,user_uuid,isInDirectory) values ('"
        + uuidv4 + "','" + file + "','" + file_created_timestamp + "','" + file.originalname + "','"
        + file.mimetype + "','" +  user_uuid + "', '0');";
    console.log("query:", insertFileQuery);

    // let mappingFile_User = "insert into file_dir_user(file_uuid,user_uuid) values ('"
    //     + uuidv4 + "','" + user_uuid +"');";
    //
    // console.log("query:", mappingFile_User);
    // let mapping_star = "update directory set star_id='yes' where  dir_uuid = '"+req.body.dir_uuid+"' " +
    //     "AND dir_name = '"+req.body.dir_name+"' AND user_uuid = '"+req.body.user_uuid+"';";
    // console.log(mapping_star);

    mysqlConnection.userSignup(insertFileQuery, function (err, result) {
        if (err) {
            throw err;
        }
    });
};

