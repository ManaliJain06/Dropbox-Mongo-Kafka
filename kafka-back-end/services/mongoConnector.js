/**
 * Created by ManaliJain on 10/31/17.
 */

var mongoclient = require('mongodb').MongoClient;
var db;
var connected = false;


//Connects to the MongoDB Database with the provided URL

exports.connect = function(url, callback){
    mongoclient.connect(url, function(err, _db){
        if (err) {
            throw new Error('Could not connect: '+err);
        } else {
            db = _db;
            connected = true;
            // console.log(connected +" is connected?");
            callback(db);
        }
    });
};


//Returns the collection from which you want to retrieve the documents on the selected database

exports.collection = function(name){
    if (!connected) {
        throw new Error('Must connect to Mongo before calling "collection"');
    }
    return db.collection(name);
};
