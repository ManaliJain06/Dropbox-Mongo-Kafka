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

const uuidv4 = uuid();
console.log(uuidv4);

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        console.log(file);
        // http://localhost:3003/1507751921274Resume_Manali_Jain.pdf
        callback(null, path.join(__dirname, "/../public"))
    },
    filename: function (req, file, callback) {

        console.log("filename", file.originalname);
        let filename = Date.now() + file.originalname;
        let filePath = "http://localhost:3003/" + filename;
        insertFile(file, filePath,sessionMgmt.user_uuid, uuidv4);
        callback(null, filename);

    }
});

const upload = multer({ storage: storage }).single('file');

exports.saveFile = function (req,res) {
    upload(req, res, function (err) {
        if(err){
            console.log(err);
            let msg = "Error occured";
            let jsonResponse = {
                "statusCode": 500,
                "result": "error",
                "message": msg
            };
            res.send(jsonResponse);
        }else{
           console.log("From save file: ")
            // let msg = "saved successfully";
            // let jsonResponse = {
            //     "statusCode": 201,
            //     "result": "Success",
            //     "message": msg
            // };
            // res.send(jsonResponse);
            res.status(201).json({file_uuid : uuidv4});
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

