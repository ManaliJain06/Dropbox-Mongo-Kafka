/**
 * Created by ManaliJain on 9/29/17.
 */
var mysql = require('mysql');
function getConnection(){
    var pool = mysql.createPool({
        connectionLimit : 100,
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'DropboxUser',
        port	 : 3306,
        "connectTimeout": 30000
    });
    return pool;
}


exports.userSignup = function(mysqlQuery, callback){
    var pool=getConnection();
    console.log("Connection done..");
    // console.log(mysqlQuery);
    pool.getConnection(function(err,connection) {
    connection.query(mysqlQuery, function(err, rows) {
        if(err){
            console.log(err.message);
            callback(err, rows);
        }
        else
        {	// return err or result
            console.log("success");
            callback(err, rows);
        }
        connection.release();
        });
    });
    console.log("\nConnection closed..");
    // connection.end();
}


// var mysql = require('mysql');
// function getConnection(){
//     var connection = mysql.createConnection({
//         host     : 'localhost',
//         user     : 'root',
//         password : 'root',
//         database : 'DropboxUser',
//         port	 : 3306
//     });
//     return connection;
// }
//
//
// exports.userSignup = function(mysqlQuery, callback){
//     var connection=getConnection();
//
//     connection.query(mysqlQuery, function(err, rows) {
//         if(err){
//             console.log(err.message);
//             callback(err, rows);
//         }
//         else
//         {	// return err or result
//             console.log("success");
//             callback(err, rows);
//         }
//     });
//     console.log("\nConnection closed..");
//     connection.end();
// }
