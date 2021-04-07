var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');

var app = express();

// include auth modules (passport)
require('./auth/auth');

// import models
const UserModel = require('./models/userModel');

// connect to mongo via mongoose
mongoose.connect("mongodb://localhost:27017/node-chat", {useNewUrlParser: "true", useUnifiedTopology: true });
mongoose.connection.on("error", err => console.log("err", err));
mongoose.connection.on("connected", (err, res) => console.log("mongoose connected"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
