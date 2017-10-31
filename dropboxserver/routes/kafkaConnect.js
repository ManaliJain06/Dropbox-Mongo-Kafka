/**
 * Created by ManaliJain on 10/30/17.
 */
var kafka = require('./kafka/client');

exports.getKafkaConnection= function(topic, req, callback){

    console.log(topic);

    kafka.make_request(topic,req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
            console.log('Successfully error completed');
            callback(err,null);
        }
        else {
            callback(null,results);
        }
    });
}