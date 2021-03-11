var express = require('express');
var path = require('path');
var sassMiddleware = require('node-sass-middleware')

var passport = require('./auth');

//Controllers
var users = require('./routes/users');

var admin = express(); // the sub app

admin.use(
    sassMiddleware({
        src: __dirname + '/assets/scss/',
        dest: __dirname + '/public/admin/css/',
        debug: true,
        outputStyle: "compressed",
        prefix: "admin/css",
    })
);

admin.set('views', path.join(__dirname, 'views'));
admin.set('view engine', 'jade');

admin.use(express.json());
admin.use(express.urlencoded({ extended: false }));
admin.use(passport.initialize());
admin.use(passport.session());

admin.use(function(req, res, next) {
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
    
});

// accept GET request on the admin login via /login
admin.get('/login', function(req, res, next) {
    //res.send('Got a GET request at /admin/login');
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

module.exports = admin;