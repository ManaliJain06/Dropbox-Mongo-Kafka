var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors');
require('./routes/passport')(passport);
var index = require('./routes/index');
var users = require('./routes/users');
var sessionManagement = require('./routes/sessionManagement');

// var session = require('express-session');
var session = require('client-sessions');
var jwt = require('jsonwebtoken');

var mongoSessionURL = "mongodb://localhost:27017/sessions";
var expressSessions = require("express-session");
var mongoStore = require("connect-mongo/es5")(expressSessions);

var app = express();


// app.use(session({
//     cookieName: 'session',
//     secret: 'dropbox_prototype_session',
//     duration: 15 * 60 * 1000,    //time for active session
//     activeDuration: 60 * 60 * 1000,
// })); // time for the session to be active when the window is open // 5 minutes set currently
app.use(expressSessions({
    secret: "CMPE273_passport",
    resave: false,
    //Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, //force to save uninitialized session to db.
    //A session is uninitialized when it is new but not modified.
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 6 * 1000,
    store: new mongoStore({
        url: mongoSessionURL
    })
}));
app.use(passport.initialize());

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

var dropboxUser = require('./routes/dropboxUser');
var directory= require('./routes/directory');
var files = require('./routes/files');
var group = require('./routes/group');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.post("/signup", dropboxUser.userSignupData);
app.post("/loginData", dropboxUser.userLoginData);

// app.post('/loginData', function(req, res) {
//     passport.authenticate('login', function(err, user) {
//         if(err) {
//             res.status(500).send();
//         }
//
//         if(!user) {
//             res.status(401).send();
//         }
//         else{
//             req.session.user = user.username;
//             console.log(req.session.user);
//             console.log("session initilized");
//             return res.status(201).send({username:"test"});
//         }
//
//     })(req, res);
// });

app.post("/postUserAbout",sessionManagement.verifyToken, dropboxUser.postUserAbout);
app.post("/signout", dropboxUser.signout);
app.post('/postUserInterest',sessionManagement.verifyToken, dropboxUser.postUserInterest);
app.get('/getLinks',sessionManagement.verifyToken, dropboxUser.getLinks);

app.post('/files',sessionManagement.verifyToken, files.saveFile);
app.post('/uploadFileInDir',sessionManagement.verifyToken, files.uploadFileInDir);

app.post('/createDirectory',sessionManagement.verifyToken, directory.createDirectory);
app.post('/deleteDir', sessionManagement.verifyToken, directory.deleteDirectory);
app.post('/deleteFile', sessionManagement.verifyToken, directory.deleteFile);
app.post('/deleteFileInDir', sessionManagement.verifyToken, directory.deleteFileInDir);
app.get('/getFiles',sessionManagement.verifyToken, directory.getFiles);
app.post('/shareFile',sessionManagement.verifyToken, directory.shareFile);
app.post('/shareDir',sessionManagement.verifyToken, directory.shareDir);
app.post('/star', sessionManagement.verifyToken, directory.starDir_files);
app.post('/shareLink', sessionManagement.verifyToken, directory.shareLink);

app.post('/createGroup', sessionManagement.verifyToken, group.createGroup);
app.post('/getGroup', sessionManagement.verifyToken, group.getGroup);
app.post('/addMember', sessionManagement.verifyToken, group.addMember);
app.post('/deleteMember', sessionManagement.verifyToken, group.deleteMember);
app.post('/deleteFileFromGroup', sessionManagement.verifyToken, group.deleteFileFromGroup);
app.post('/deleteGroup', sessionManagement.verifyToken, group.deleteGroup);

app.post('/filesGroup',sessionManagement.verifyToken, files.saveFileGroup);
app.post('/uploadFileInGroup',sessionManagement.verifyToken, files.uploadFileInGroup);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
app.listen(3003, function () {
    console.log("Server started on port: " + 3003);
});

module.exports = app;

