var mongoose = require('mongoose')
var crypto = require('crypto');
var Schema = mongoose.Schema

var userShema = new Schema({
    name: {
        type: String,
        required: [true, "can't be blank"],
    }, 
    user_name: {
        type: String,
        unique: [true, "user address exists"],
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    },
    email: {
        type: String,
        unique: [true, "user address exists"],
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, "is invalid"],
    },
    role: {
        type: String,
        default: 'user'
    },
    hash: {
        type: String,
    },
    salt: {
        type: String,
    },
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    },
})

// Method to set salt and hash the password for a user 
userShema.methods.setPassword = function(password) { 
     
    // Creating a unique salt for a particular user 
    this.salt = crypto.randomBytes(16).toString('hex'); 
    
    // Hashing user's salt and password with 1000 iterations, 
    
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`); 
}; 
  
// Method to check the entered password is correct or not 
userShema.methods.validPassword = function(password) { 
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`); 
    return this.hash === hash; 
};
  
//Sử dụng JWT để sinh ra token chứa info của user đã login, với secret là key cho để mã hóa cùng, tất nhiên nên dùng biến môi trường nhé =))
userShema.methods.generateJWT = function() {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);
  
    return jwt.sign(
        {
            id: this._id,
            username: this.username,
            exp: parseInt(exp.getTime() / 1000)
        },
      secret
    );
};

module.exports = mongoose.model('User', userShema )