/**
 * Created by ManaliJain on 10/30/17.
 */
var connection =  new require('./kafka/Connection');

var files = require('./services/files_kafka');
var groups = require('./services/groups_kafka');
var directory = require('./services/directory_kafka');
var dropboxUser = require('./services/dropboxUser_kafka');

var topic_name = 'request_topic';
var consumer = connection.getConsumer(topic_name);
var producer = connection.getProducer();

console.log('server is running');
consumer.on('message', function (message) {
    console.log('message receivedsss');
    console.log(JSON.stringify(message.value));
    //here data.data is equivalent to boy of the request that means req.body
    var data = JSON.parse(message.value);
    let category = data.data.category;
    let api = data.data.api;
    console.log('category is',category);
    switch(category) {
        case "dropboxUser" :
            dropboxUser.handleUserRequest(data.data,api, function(err,res){
                console.log('after handle'+res);
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0
                    }
                ];
                producer.send(payloads, function(err, data){
                    console.log(data);
                });
                return;
            });
            return;

        case "directory" :
            directory.handleDirRequest(data.data,api, function(err,res){
                console.log('after handle og get files'+res);
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0
                    }
                ];
                producer.send(payloads, function(err, data){
                    console.log(data);
                });
                return;
            });
            return;

        case "files" :
            files.handleFileRequest(data.data, api, function(err,res){
                console.log('after handle'+res);
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0
                    }
                ];
                producer.send(payloads, function(err, data){
                    console.log(data);
                });
                return;
            });
            return;

        case "group" :
            groups.handleGroupRequest(data.data,api, function(err,res){
                console.log('after handle'+res);
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0
                    }
                ];
                producer.send(payloads, function(err, data){
                    console.log(data);
                });
                return;
            });
            return;
    }


});