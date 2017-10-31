/**
 * Created by ManaliJain on 10/30/17.
 */
var connection =  new require('./kafka/Connection');
var login = require('./services/login');
var signup = require('./services/signup');
var files = require('./services/files');

var topic_name = 'login_topic';
var consumer = connection.getConsumer(topic_name);
var producer = connection.getProducer();

console.log('server is running');
consumer.on('message', function (message) {
    console.log('message receivedsss');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    let api = data.data.api;
    console.log('api is',api);
    switch(api) {

        case "login" :
            login.handle_request(data.data, function(err,res){
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

        case "signup" :
            signup.handle_request(data.data, function(err,res){
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

        case "getFiles" :
            files.handle_request(data.data, function(err,res){
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