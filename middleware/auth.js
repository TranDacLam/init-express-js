var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('./../models/User');

passport.use(new localStrategy(
    function(username, password, done){
        console.log(username, password);
        if(!username){
            return done(null, false, { message: 'Incorrect username.' });
        }
        if(!password){
            return done(null, false, { message: 'Incorrect password.' });
        }
        User.findOne({ user_name : username }, function(err, user) { 
            if (user === null) { 
                return done(null, false, { message: 'Incorrect username.' });
            } 
            else { 
                if (user.validPassword(password)) { 
                    return done(null, user);
                } 
                else { 
                    return done(null, false, { message: 'Incorrect password.' });
                } 
            } 
        }); 
    }
));

//FOR SESSION
passport.serializeUser(function(user, done){
    done(null, user.id);
});
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

module.exports = passport;