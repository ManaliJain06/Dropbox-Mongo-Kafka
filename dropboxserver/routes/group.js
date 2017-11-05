/**
 * Created by ManaliJain on 10/14/17.
 */
var uuid = require('uuid/v4');
var mysqlConnection = require('./mysqlConnector');
var session = require('client-sessions');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var sessionMgmt = require('./sessionManagement');
var Q = require('q');
var uuid = require('uuid/v4');
var mongo = require("./mongoConnector");
var mongodb = require('mongodb');
var mongoLogin = "mongodb://localhost:27017/Dropboxuser";
var kafkaConnect = require('./kafkaConnect');

// exports.createGroup =function(req,res){
//     let jsonResponse = {};
//     let uuidv4 = uuid();
//     console.log(uuidv4);
//     let createGroupQuery = "insert into groups(group_name,creator_name,group_uuid,creator_uuid) values ('"
//         + req.body.groupName + "','" + req.body.user_name + "','"  + uuidv4 + "','" + req.body.user_uuid + "');";
//     console.log("query:", createGroupQuery);
//     mysqlConnection.userSignup(createGroupQuery, function (err, result) {
//         if (err) {
//             var msg = "Error Occured";
//             jsonResponse = {
//                 "statusCode": 500,
//                 "result": "Error",
//                 "message": msg
//             };
//             res.send(jsonResponse);
//         } else if(result.affectedRows > 0){
//             var msg = "Group created";
//             jsonResponse = {
//                 "statusCode": 201,
//                 "result": "success",
//                 "message": msg
//             };
//             res.send(jsonResponse);
//         } else {
//             var msg = "Error";
//             jsonResponse = {
//                 "statusCode": 400,
//                 "result": "Error",
//                 "message": msg
//             };
//             res.send(jsonResponse);
//         }
//     });
// }

// exports.getGroup = function(req,res) {
//     let jsonResponse = {};
//     let groupMembersArray = [];
//     let groupFilesArray =[];
//     let groups = [];
//     // let combinedArray =[];
//     let getGroupQuery = "select * from groups where creator_uuid = '" + sessionMgmt.user_uuid + "'" +
//         " OR member_uuid = '" + sessionMgmt.user_uuid + "';";
//     console.log("query:", getGroupQuery);
//     mysqlConnection.userSignup(getGroupQuery, function (err, result) {
//         if (err) {
//             var msg = "Error Occured";
//             jsonResponse = {
//                 "statusCode": 500,
//                 "result": "Error",
//                 "message": msg
//             };
//             res.send(jsonResponse);
//         } else if(result.length > 0) {
//             console.log(result);
//
//             Q.all([queryMembers(result),
//                 queryFiles(result)])
//                 .spread(function (queryMember, queryFile) {
//                     console.log("groups members are", queryMember);
//                     console.log("groups file are", queryFile);
//                     groupMembersArray = getGroupMembersJSON(queryMember,sessionMgmt.user_uuid);
//                     groupFilesArray = getGroupFilesJSON(queryFile,sessionMgmt.user_uuid)
//                     console.log(groupMembersArray);
//                     console.log(groupFilesArray);
//                     groups = getCombinedGroup(groupMembersArray,groupFilesArray);
//
//                     jsonResponse = {
//                         "statusCode": 201,
//                         "result": "Success",
//                         "group": groups,
//                         "message": ''
//                     };
//                     console.log("final group", groups);
//                     res.send(jsonResponse);
//                 })
//                 .catch(function(err){
//                     let msg = "Failed";
//                     jsonResponse = {
//                         "statusCode": 500,
//                         "result": "Error",
//                         "message": msg
//                     };
//                     res.send(jsonResponse);
//                 });
//         }else {
//                var msg = "No Groups";
//                 jsonResponse = {
//                     "statusCode": 300,
//                     "result": "Error",
//                     "group": groups,
//                     "message": msg
//                 };
//                 res.send(jsonResponse);
//             }
//     });
// }

// let queryMembers = function (result) {
//     let groupMember = Q.defer();
//     let querycount = 0;
//     let response = [];
//     for (let i = 0; i < result.length; i++) {
//         let membersQuery = "select * from groups where group_name = '" + result[i].group_name + "'" +
//             " AND group_uuid = '" + result[i].group_uuid + "';";
//
//         console.log(membersQuery);
//         mysqlConnection.userSignup(membersQuery, function (err, result1) {
//             if (err) {
//                 groupMember.reject(err)
//             } else {
//                 querycount++;
//                 response.push(result1);
//                 if (querycount === result.length) {
//                     response = [].concat.apply([], response);
//                     groupMember.resolve(response);
//                 }
//                 console.log("All Done");
//             }
//         });
//     }
//     return groupMember.promise;
// };

// let queryFiles = function (result) {
//     let groupFile = Q.defer();
//     let querycount = 0;
//     let response = [];
//     for (let i = 0; i < result.length; i++) {
//         let fileQuery = "select * from file_in_group where group_name = '" + result[i].group_name + "'" +
//             " AND group_uuid = '" + result[i].group_uuid + "';";
//
//         console.log(fileQuery);
//         mysqlConnection.userSignup(fileQuery, function (err, result1) {
//             if (err) {
//                 groupFile.reject(err)
//             } else {
//                 querycount++;
//                 response.push(result1);
//                 if (querycount === result.length) {
//                     response = [].concat.apply([], response);
//                     groupFile.resolve(response);
//                 }
//                 console.log("All Done");
//             }
//         });
//     }
//     return groupFile.promise;
// };

// getGroupMembersJSON = function(result,creator) {
//
//     // if(creator === result[i].shareByUserId){
//     //     canDelete = true;
//     // }
//     // console.log(result);
//     let group = [];
//     let files = [];
//     let flag = true;
//     for (let i = 0; i < result.length; i++) {
//         if (result[i] !== undefined) {
//             for (let j = 0; j < group.length; j++) {
//                 if (result[i].group_name !== null && (result[i].group_name === group[j].group_name)) {
//                     flag = false;
//                     if (result[i].member_name !== null) {
//                         let memberJson1 = {
//                             "member_name": result[i].member_name,
//                             "member_uuid": result[i].member_uuid,
//                         };
//                         let  array = [];
//                         array = group[j].membersArray;
//                         array.push(memberJson1);
//                         group[j].membersArray = array;
//                     } else {
//                         group[j].creator_uuid = result[i].creator_uuid;
//                         group[j].creator_name = result[i].creator_name;
//                         let memberJson1 = {
//                             "member_name": result[i].creator_name,
//                             "member_uuid": result[i].creator_uuid,
//                         };
//                         let  array = [];
//                         array = group[j].membersArray;
//                         array.push(memberJson1);
//                         group[j].membersArray = array;
//                     }
//                     break;
//                 }
//                 flag = true;
//             }
//
//             if (flag) {
//                 let memberArray = [];
//                 if (result[i].member_name !== null) {
//                      let memberjson = {
//                         "member_name": result[i].member_name,
//                         "member_uuid": result[i].member_uuid,
//                     };
//                     memberArray.push(memberjson);
//                 } else {
//                     let memberjson = {
//                         "member_name": result[i].creator_name,
//                         "member_uuid": result[i].creator_uuid,
//                     };
//                     memberArray.push(memberjson);
//                 }
//                 let json = {
//                     "group_uuid": result[i].group_uuid,
//                     "group_name": result[i].group_name,
//                     "creator_uuid": result[i].creator_uuid,
//                     "creator_name": result[i].creator_name,
//                     "membersArray": memberArray,
//                     "filesArray": files
//                 };
//                 group.push(json);
//             }
//             // console.log("member json", group);
//         }
//     }
//     // console.log("group json", group);
//     return group;
// }

// getGroupFilesJSON = function(result,creator) {
//
//     // if(creator === result[i].shareByUserId){
//     //     canDelete = true;
//     // }
//     // console.log(result);
//     let groupFile = [];
//     let member = [];
//     let flag = true;
//     for (let i = 0; i < result.length; i++) {
//         if (result[i] !== undefined) {
//             for (let j = 0; j < groupFile.length; j++) {
//                 if (result[i].group_name !== null && (result[i].group_name === groupFile[j].group_name)) {
//                     flag = false;
//                     // if (result[i].member_name !== null) {
//                     let filejson1 = {
//                         "file_name": result[i].file_name,
//                         "file_created": result[i].file_created,
//                         "file_path": result[i].file_path,
//                         "file_uuid": result[i].file_uuid,
//                         "file_owner": result[i].file_owner
//                     };
//                     let  array = [];
//                     array = groupFile[j].filesArray;
//                     array.push(filejson1);
//                     groupFile[j].filesArray = array;
//                     break;
//                 }
//                 flag = true;
//             }
//
//             if (flag) {
//                 let fileArray = [];
//                 let filejson = {
//                     "file_name": result[i].file_name,
//                     "file_created": result[i].file_created,
//                     "file_path": result[i].file_path,
//                     "file_uuid": result[i].file_uuid,
//                     "file_owner": result[i].file_owner
//                 };
//                 fileArray.push(filejson);
//                 let json = {
//                     "group_uuid": result[i].group_uuid,
//                     "group_name": result[i].group_name,
//                     "membersArray": member,
//                     "filesArray": fileArray
//                 };
//                 groupFile.push(json);
//             }
//             // console.log("member json", groupFile);
//         }
//     }
//     // console.log("group json", groupFile);
//     return groupFile;
// }

// getCombinedGroup = function(member,file) {
//     let fileArray = [];
//     let group = [];
//     if (member.length === 0 && file.length === 0) {
//         return group;
//     }
//     else if (file.length === 0 && member.length > 0) {
//         return member;
//     }
//     else if (member.length === 0 && file.length > 0) {
//         return file;
//     }
//     else if (member.length>0 && file.length>0) {
//         let flag = true;
//         for (let i = 0; i < member.length; i++) {
//
//             for (let j = 0; j < file.length; j++) {
//                 if (member[i].group_uuid === file[j].group_uuid) {
//                     flag = false;
//                     let groupjson = {
//                         "group_uuid": member[i].group_uuid,
//                         "group_name": member[i].group_name,
//                         "creator_uuid": member[i].creator_uuid,
//                         "creator_name": member[i].creator_name,
//                         "membersArray": member[i].membersArray,
//                         "filesArray": file[j].filesArray
//                     };
//                     group.push(groupjson);
//                     break;
//                 }
//                 flag =true;
//             }
//             if(flag){
//                     let groupjson1 = {
//                         "group_uuid": member[i].group_uuid,
//                         "group_name": member[i].group_name,
//                         "creator_uuid": member[i].creator_uuid,
//                         "creator_name": member[i].creator_name,
//                         "membersArray": member[i].membersArray,
//                         "filesArray": fileArray
//                     };
//                     group.push(groupjson1);
//                 }
//             // console.log("member json", group);
//         }
//         // console.log("group json", group);
//         return group;
//     }
// }

// exports.addMember = function(req,res) {
//     let jsonResponse = {};
//
//     let getUserIdToadd = "select user_uuid, firstname,lastname from user where email = '" + req.body.addToEmail + "';";
//     mysqlConnection.userSignup(getUserIdToadd, function (err, result) {
//         if (err) {
//             var msg = "Error Occured";
//             jsonResponse = {
//                 "statusCode": 500,
//                 "result": "Error",
//                 "message": msg
//             };
//             res.send(jsonResponse);
//         } else if(result.length === 0){
//             var msg = "User is not available in Dropbox";
//             jsonResponse = {
//                 "statusCode": 300,
//                 "result": "Error",
//                 "message": msg
//             };
//             res.send(jsonResponse);
//         }else if(result.length >0){
//             let name = result[0].firstname + " " + result[0].lastname;
//             let addmem = "insert into groups(group_name,group_uuid,member_name,member_uuid) values ('"
//                 + req.body.group_name + "','" + req.body.group_uuid + "','"+ name + "','" + result[0].user_uuid + "');";
//             mysqlConnection.userSignup(addmem, function (err, result1) {
//                 if (err) {
//                     var msg = "add member failed";
//                     jsonResponse = {
//                         "statusCode": 500,
//                         "result": "Error",
//                         "message": msg
//                     };
//                     res.send(jsonResponse);
//                 } else {
//                     var msg = "Add member Success";
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

// exports.deleteMember = function(req,res){
//
//     let jsonResponse = {};
//
//     let deletemember = "delete from groups where group_uuid = '" + req.body.group_uuid + "' AND " +
//         "group_name = '" + req.body.group_name + "' AND member_uuid = '" + req.body.delete_uuid + "';";
//     console.log("query:", deletemember);
//
//     mysqlConnection.userSignup(deletemember, function (err, result) {
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
//                 let msg = "Member Deleted";
//                 jsonResponse = {
//                     "statusCode": 201,
//                     "result": "Success",
//                     "data" : result[0],
//                     "message": msg
//                 };
//                 res.send(jsonResponse);
//             } else {
//                 let msg = "Error Occured";
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

// exports.deleteFileFromGroup = function(req,res){
//
//     let jsonResponse = {};
//
//     let deleteFileFromGrpQuery = "delete from file_in_group where file_uuid = '" + req.body.file_uuid + "' AND " +
//         "group_name = '" + req.body.group_name + "' AND group_uuid = '" + req.body.group_uuid + "';";
//     console.log("query:", deleteFileFromGrpQuery);
//
//     mysqlConnection.userSignup(deleteFileFromGrpQuery, function (err, result) {
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
//                 let msg = "File Deleted";
//                 jsonResponse = {
//                     "statusCode": 201,
//                     "result": "Success",
//                     "data" : result[0],
//                     "message": msg
//                 };
//                 res.send(jsonResponse);
//             } else {
//                 let msg = "Error Occured";
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

// exports.deleteGroup = function(req,res){
//
//     let jsonResponse = {};
//
//     let deleteGroupFilesQuery = "delete from file_in_group where " +
//     "group_name = '" + req.body.group_name + "' AND group_uuid = '" + req.body.group_uuid + "';";
//     console.log("query:", deleteGroupFilesQuery);
//
//     let deleteGroupMembersQuery = "delete from groups where group_uuid = '" + req.body.group_uuid + "' AND " +
//         "group_name = '" + req.body.group_name+ "';";
//     console.log("query:", deleteGroupMembersQuery);
//
//
//     Q.all([deleteMembers(deleteGroupMembersQuery),
//         deleteFiles(deleteGroupFilesQuery)])
//         .spread(function (result1, result2) {
//
//             if(result1.affectedRows >0  && result2 !== undefined){
//                 jsonResponse = {
//                     "statusCode": 201,
//                     "result": "Success",
//                     "msg": 'Group Successfully deleted'
//                 };
//                 res.send(jsonResponse);
//             } else {
//                 jsonResponse = {
//                     "statusCode": 500,
//                     "result": "Error",
//                     "msg": 'Error Occured'
//                 };
//                 res.send(jsonResponse);
//             }
//         })
//         .catch(function(err){
//             let msg = "Failed";
//             jsonResponse = {
//                 "statusCode": 500,
//                 "result": "Error",
//                 "msg": msg
//             };
//             res.send(jsonResponse);
//         });
// }

// let deleteMembers = function(deleteGroupMembersQuery) {
//     let groupMem = Q.defer();
//     mysqlConnection.userSignup(deleteGroupMembersQuery, function (err, result1) {
//         if (err) {
//             groupMem.reject(err)
//         } else {
//             groupMem.resolve(result1);
//         }
//     });
//     return groupMem.promise;
// }

// let deleteFiles = function(deleteGroupFilesQuery) {
//     let groupfile = Q.defer();
//     mysqlConnection.userSignup(deleteGroupFilesQuery, function (err, result2) {
//         if (err) {
//             groupfile.reject(err)
//         } else {
//             groupfile.resolve(result2);
//         }
//     });
//     return groupfile.promise;
// }

//MONGO code
exports.createGroup =function(req,res){

    let topic= "request_topic";
    req.body.category = "group";
    req.body.api = "createGroup";
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
    // let uuidv4 = uuid();
    // console.log(uuidv4);
    //
    // mongo.connect(mongoLogin, function (mongoConn) {
    //     console.log('Connected to mongo at: ' + mongoLogin);
    //
    //     let collection = mongoConn.collection('groups');
    //     let payload = {
    //         "group_uuid": uuidv4,
    //         "group_name": req.body.groupName,
    //         "creator_uuid": req.body.user_uuid,
    //         "creator_name": req.body.user_name,
    //         "membersArray": [{
    //             "member_uuid": req.body.user_uuid,
    //             "member_name": req.body.user_name
    //             }],
    //         "filesArray": []
    //     };
    //
    //     collection.insert(payload, function (err, result) {
    //         // console.log("file result is", result);
    //         if (err) {
    //             var msg = "Error Occured";
    //             jsonResponse = {
    //                 "statusCode": 500,
    //                 "result": "Error",
    //                 "message": msg
    //             };
    //             res.send(jsonResponse);
    //         } else if(result) {
    //             var msg = "Group created";
    //             jsonResponse = {
    //                 "statusCode": 201,
    //                 "result": "success",
    //                 "message": msg
    //             };
    //             res.send(jsonResponse);
    //         } else {
    //             var msg = "Error";
    //             jsonResponse = {
    //                 "statusCode": 400,
    //                 "result": "Error",
    //                 "message": msg
    //             };
    //             res.send(jsonResponse);
    //         }
    //     });
    // });
}

exports.getGroup = function(req,res) {

    let topic= "request_topic";
    req.body.category = "group";
    req.body.api = "getGroup";
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
    // let groups = [];
    // mongo.connect(mongoLogin, function (mongoConn) {
    //     console.log('Connected to mongo at: ' + mongoLogin);
    //
    //     let collection = mongoConn.collection('groups');
    //     collection.find({'membersArray.member_uuid':sessionMgmt.user_uuid}).toArray(function(err, result) {
    //         console.log("group result is", result);
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
    //                 "result": "Success",
    //                 "group": result,
    //                 "message": ''
    //             };
    //             console.log("final group", groups);
    //             res.send(jsonResponse);
    //         } else {
    //             var msg = "";
    //             jsonResponse = {
    //                 "statusCode": 201,
    //                 "result": "success",
    //                 "group": groups,
    //                 "message": msg
    //             };
    //             res.send(jsonResponse);
    //         }
    //     });
    // });
}

exports.addMember = function(req,res) {

    let topic= "request_topic";
    req.body.category = "group";
    req.body.api = "addMember";
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
    //     let collectionGroup = mongo.collection('groups');
    //     let collection = mongo.collection('user');
    //
    //     collection.findOne({email: req.body.addToEmail}, function(err, result){
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
    //             var msg = "User is not available in Dropbox";
    //             jsonResponse = {
    //                 "statusCode": 300,
    //                 "result": "Error",
    //                 "message": msg
    //             };
    //             res.send(jsonResponse);
    //         } else if (result) {
    //             let name = result.firstname + " " + result.lastname;
    //             var member= {
    //                 "member_uuid": result.user_uuid,
    //                 "member_name": name
    //             }
    //             collectionGroup.update({ "_id" : new mongodb.ObjectID(req.body._id)},
    //                 {$push:{"membersArray": member }}, function (err, result1) {
    //                     console.log("result is", result1);
    //                     if (err) {
    //                         var msg = "Add member failed";
    //                         jsonResponse = {
    //                             "statusCode": 500,
    //                             "result": "Error",
    //                             "message": msg
    //                         };
    //                         res.send(jsonResponse);
    //                     } else {
    //                         if(result1.result.nModified > 0){
    //                             var msg = "Add member Success";
    //                             jsonResponse = {
    //                                 "statusCode": 201,
    //                                 "result": "Error",
    //                                 "message": msg
    //                             };
    //                             res.send(jsonResponse);
    //                         } else {
    //                             var msg = "Error";
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

exports.deleteMember = function(req,res){

    let topic= "request_topic";
    req.body.category = "group";
    req.body.api = "deleteMember";
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
    // mongo.connect(mongoLogin, function (mongoConn) {
    //     console.log('Connected to mongo at: ' + mongoLogin);
    //
    //     let collection = mongoConn.collection('groups');
    //
    //     collection.update({"_id" : new mongodb.ObjectID(req.body._id)},
    //         { $pull: { membersArray: {member_uuid : req.body.delete_uuid }}}, function (err, result) {
    //             if (err) {
    //                 let msg = "Error Occured. delete once again";
    //                 jsonResponse = {
    //                     "statusCode": 500,
    //                     "result": "Error",
    //                     "message": msg
    //                 };
    //                 res.send(jsonResponse);
    //             } else {
    //                 if (result!==null) {
    //                     let msg = "Member Deleted";
    //                     jsonResponse = {
    //                         "statusCode": 201,
    //                         "result": "Success",
    //                         "data" : result,
    //                         "message": msg
    //                     };
    //                     res.send(jsonResponse);
    //                 } else {
    //                     let msg = "Error Occured";
    //                     jsonResponse = {
    //                         "statusCode": 400,
    //                         "result": "Error",
    //                         "message": msg
    //                     };
    //                     res.send(jsonResponse);
    //                 }
    //             }
    //         });
    // })
}

exports.deleteFileFromGroup = function(req,res) {

    let topic= "request_topic";
    req.body.category = "group";
    req.body.api = "deleteFileFromGroup";
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
    // mongo.connect(mongoLogin, function (mongoConn) {
    //     console.log('Connected to mongo at: ' + mongoLogin);
    //
    //     let collection = mongoConn.collection('groups');
    //
    //     collection.update({"_id": new mongodb.ObjectID(req.body._id)},
    //         {$pull: {filesArray: {file_uuid: req.body.file_uuid}}}, function (err, result) {
    //             // console.log("file result is", result);
    //             if (err) {
    //                 let msg = "Error Occured. delete once again";
    //                 jsonResponse = {
    //                     "statusCode": 500,
    //                     "result": "Error",
    //                     "message": msg
    //                 };
    //                 res.send(jsonResponse);
    //             } else {
    //                 if (result !== null) {
    //                     let msg = "File deleted";
    //                     jsonResponse = {
    //                         "statusCode": 201,
    //                         "result": "Success",
    //                         "data": result,
    //                         "message": msg
    //                     };
    //                     console.log(jsonResponse)
    //                     res.send(jsonResponse);
    //                 } else {
    //                     let msg = "Error Occured";
    //                     jsonResponse = {
    //                         "statusCode": 400,
    //                         "result": "Error",
    //                         "message": msg
    //                     };
    //                     res.send(jsonResponse);
    //                 }
    //             }
    //         });
    // });
}

exports.deleteGroup = function(req,res){

    let topic= "request_topic";
    req.body.category = "group";
    req.body.api = "deleteGroup";
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
    // mongo.connect(mongoLogin, function (mongoConn) {
    //     console.log('Connected to mongo at: ' + mongoLogin);
    //
    //     let collection = mongoConn.collection('groups');
    //
    //     collection.remove({ "_id" : new mongodb.ObjectID(req.body._id)}, function (err, result) {
    //         if (err) {
    //             let msg = "Error Occured. Delete once again";
    //             jsonResponse = {
    //                 "statusCode": 500,
    //                 "result": "Error",
    //                 "message": msg
    //             };
    //             res.send(jsonResponse);
    //         } else {
    //             if (result!==null) {
    //                 jsonResponse = {
    //                     "statusCode": 201,
    //                     "result": "Success",
    //                     "msg": 'Group Successfully deleted'
    //                 };
    //                 res.send(jsonResponse);
    //             } else {
    //                 let msg = "Failed";
    //                 jsonResponse = {
    //                     "statusCode": 500,
    //                     "result": "Error",
    //                     "msg": msg
    //                 };
    //                 res.send(jsonResponse);
    //             }
    //         }
    //     });
    // });
}
