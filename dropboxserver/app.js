var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var index = require('./routes/index');
var users = require('./routes/users');
var session = require('client-sessions');

var app = express();

app.use(session({
    cookieName: 'session',
    secret: 'dropbox_prototype_session',
    duration: 15 * 60 * 1000,    //time for active session
    activeDuration: 1 * 60 * 1000,
    path : '/',
    httpOnly: false })); // time for the session to be active when the window is open // 5 minutes set currently

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

var dropboxUser = require('./routes/dropboxUser');
var files = require('./routes/files');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
// // app.use('/users', users);
app.post("/signup", dropboxUser.userSignupData);
app.post("/login", dropboxUser.userLoginData);
app.post("/postUserInterest", dropboxUser.postUserInterest);
app.post("/postUserAbout", dropboxUser.postUserAbout);
app.post("/signout",dropboxUser.signout);
app.use('/files', files);
// app.post("/substract",operations.substract);
// app.post("/multiply",operations.multiply);
// app.post("/divide",operations.divide);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
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

