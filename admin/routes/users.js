var express = require('express');
var users = express.Router();

// accept GET request on the admin user index via users/
users.get('/', function(req, res, next) {
  return res.render('pages/users/index', {title: 'Users'});
});

module.exports = users;