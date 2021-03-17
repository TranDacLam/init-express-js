var createError = require('http-errors');
var express = require('express');
var path = require('path'); 
var passport = require('./../middleware/auth');

//Controllers
var users = require('./routes/users');

var admin = express(); // the sub app

admin.set('views', path.join(__dirname, 'views'));

admin.use(passport.initialize());
admin.use(passport.session());

admin.use(function(req, res, next) {
	console.log("req", req.user, req.path, admin.mountpath)
	if (req.user == null && req.path.indexOf('/login') === 0 && admin.mountpath == '/admin') {
		next(); 
	} else if (req.user == null && req.path.indexOf('/public') === 0 && admin.mountpath == '/admin') {
		next(); 
	} else if (req.user == null && admin.mountpath == '/admin') {
		res.redirect('/admin/login');
	}else{
		next(); 
	}
});

admin.use('/users', users);

// accept GET request on the admin index via /
admin.get('/', function(req, res, next) {
	res.send('Got a GET request at /admin/');
});

// accept GET request on the admin dashboard via /dashboard
admin.get('/dashboard', function(req, res, next) {
	return res.render('pages/dashboard/index', {title: 'Dashboard'});
});

// accept GET request on the admin login via /login
admin.get('/login', function(req, res, next) {
	//res.send('Got a GET request at /admin/login');
	console.log("admin login");
	passport.authenticate('local', function (err, user, info) {
		if (err) return next(err);
		if (!user) {
			return res.render('pages/login/index', {title: 'Login'});
		}

		req.logIn(user, function (err) {
			if (err) return next(err);
			return res.redirect('/admin');
		});
	})(req, res, next);
});

admin.post('/login', passport.authenticate('local', {
	failureRedirect: '/admin/login',
	successRedirect: '/admin'
}));

// catch 404 and forward to error handler
admin.use(function(req, res, next) {
	next(createError(404));
});

// error handler
admin.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('pages/errors/error');
});

module.exports = admin;