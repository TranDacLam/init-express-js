var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware')

var admin = require('./admin/app');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// adding the sass middleware
console.log("__dirname", __dirname)
app.use(
  sassMiddleware({
    src: __dirname + '/assets/scss/',
    dest: __dirname + '/public/css/',
    debug: true,
    outputStyle: "compressed",
    prefix: "/css",
  })
);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', admin); // mount the sub app
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
  res.render('pages/errors/error');
});

module.exports = app;
