var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var mysql = require('mysql');
var { adminDefault } = require('./config/seed');
var configDB = require('./config/database');

var admin = require('./admin/app');
var main = require('./app/app');
var app = express();
var User = require('./models/User');

// setup database
var db = mysql.createConnection(configDB)

// open the MySQL connection
db.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});


app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', admin); // mount the sub app
app.use('/', main);

module.exports = app;
