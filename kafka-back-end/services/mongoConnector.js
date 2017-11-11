/**
 * Created by ManaliJain on 10/31/17.
 */

//without connection pooling

var mongoclient = require('mongodb').MongoClient;
var db;
var connected = false;
var mongoLogin = "mongodb://localhost:27017/Dropboxuser";
// var url = "mongodb://localhost:27017/Dropboxuser";
let conn;

// Connects to the MongoDB Database with the provided URL

// exports.connect = function(url, callback){
//     mongoclient.connect(url, function(err, _db){
//         if (err) {
//             throw new Error('Could not connect: '+err);
//         } else {
//             db = _db;
//             connected = true;
//             // console.log(connected +" is connected?");
//             callback(db);
//         }
//     });
// };
//
//
// //Returns the collection from which you want to retrieve the documents on the selected database
//
// exports.collection = function(name){
//     if (!connected) {
//         throw new Error('Must connect to Mongo before calling "collection"');
//     }
//     return db.collection(name);
// };


//with connection pooling

let connectionPool = [];
let dbPoolSize = 20;

// creating a pool of connections
createConnectionPool();

function createConnectionPool(){
    for(let i = 0; i < dbPoolSize; i++){
        addMongoConnectionToPool();
    }
};

function addMongoConnectionToPool(){
    return mongoclient.connect(mongoLogin, function(err, _db){
        console.log("Creating a new connection in the pool with MongoDB at : "+mongoLogin);
        if (err) {
            throw new Error('Could not connect: '+err);
        }
        db = _db;
        // Adding the connection to the pool.
        connectionPool.push(db);
        connected = true;
        console.log(connected +" is connected?");
    });
}



/**
 * Connects to the MongoDB Database with the provided URL
 */
exports.connect = function(url, callback){
    console.log('connection pool length on first call : '+connectionPool.length);
    if(connectionPool.length > 0){
        conn = connectionPool.pop();
        callback(conn);
    } else {
        //to check if connection pool is empty
        console.log("Connection pool is Empty... Creating a pool.");
        addMongoConnectionToPool();
        conn = connectionPool.pop();
        callback(conn);
    }
    console.log("connection pool length on first call : "+connectionPool.length);
};

/**
 * Returns the collection on the selected database
 */
exports.collection = function(name){
    if (!connected) {
        throw new Error('Must connect to Mongo before calling "collection"');
    }
    if(connectionPool.length > 0){
        console.log("pool collection length: "+connectionPool.length);
        return conn.collection(name);
    } else {
        console.log("Connection pool is empty. Filling connection pool to its full capacity.");
        //this.createConnectionPool();
        conn = connectionPool.pop();
        console.log("pool collection length: "+connectionPool.length);
        return conn.collection(name);
    }
};

exports.releaseConnection = function(connection){
    if (!connected) {
        throw new Error('Must connect to Mongo before releasing connection');
    }
    if(connectionPool.length < dbPoolSize){
        connectionPool.push(connection);
        console.log("pool release length: "+connectionPool.length);
    }
}