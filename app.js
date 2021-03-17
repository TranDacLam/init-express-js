var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var { adminDefault } = require('./config/database')

var admin = require('./admin/app');
var main = require('./app/app');
var app = express();
var User = require('./models/User');

//Set up default mongoose connection
var mongoDB = 'mongodb://localhost:27017/init-express-js';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
//Get the default connection
var db = mongoose.connection;

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

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function() {
	// we're connected!
	console.log("db connected");
	User.findOne({ user_name : adminDefault.user_name }, function(err, user) { 
		if(!user){
			let newUser = new User(); 
			newUser.name = adminDefault.name;
			newUser.user_name = adminDefault.user_name;
			newUser.email = adminDefault.email
			newUser.role = adminDefault.role
			newUser.setPassword(adminDefault.password); 
			newUser.save((err, user) => {
				if (err) {
					throw err;
				}
			});
		}
	}); 
});

app.use('/admin', admin); // mount the sub app
app.use('/', main);

module.exports = app;
