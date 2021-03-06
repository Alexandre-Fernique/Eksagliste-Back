const express = require('express');
const cors = require("cors");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var listeRouter = require('./routes/liste');
var postRouter = require('./routes/post');
var questionRouter = require('./routes/question');

var app = express();

// view engine setup
app.use(cors())
app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/liste', listeRouter);
app.use('/post', postRouter);
app.use('/question', questionRouter);

// catch 404 and forward to error handler
app.use(function(req, res) {
  res.status(404).send("Erreur")
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

});

module.exports = app;
