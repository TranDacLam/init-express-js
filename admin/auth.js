var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
passport.use(new localStrategy(
    function(username, password, done){
        var db_username = 'tojibon@gmail.com';
        var db_password = 'tojibon@gmail';

        console.log("Login form posted data: ");
        console.log("Username: " + username);
        console.log("Password: " + password);

        if(username === db_username && password === db_password){
            return done(null, {username: username});
        }
        else{
            //return done(null, false);
            console.log(db_username);
            return done(null, {username: db_username});
        }
    }
));

//FOR SESSION
passport.serializeUser(function(user, done){
    done(null, user.username);
    // done(null, user.id);
});
passport.deserializeUser(function(username, done){
    done(null, {username: username});
    // User.findById(id).then(function (user) {
    //     done(null, user);
    // }).catch(function (err) {
    //     console.log(err);
    // })
});

module.exports = passport;