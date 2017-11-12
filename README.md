# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###
This repository is for Dropbox application using react js as front end and node js as back end and uses Kafka for scalability and fault tolerance.


DROPBOX
### How do I get set up? ###
Client setup-
1) Client module is dropboxclient
2) Resolve dependencies in package.json
3) Launch the application by - npm start
4) Client port is 3000 
5) Hit the URL- localhost:3000

Server setup-
1) Server module is dropboxserver
2) Resolve dependencies in package.json
3) Run app.js to start the server
4) Server port is 3003

kafka Server-
1) Server module is Kafka-back-end
2) Resolve dependencies in package.json
3) Start your Zookeeper and kafka Servers
4) Create two topics for the kafka
	a) request_topic - to send all the requests
	b) response_topic - to send all the responses

5) Run server.js to start the kafka server




