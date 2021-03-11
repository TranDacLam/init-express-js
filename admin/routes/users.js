var express = require('express');
var users = express.Router();

// accept GET request on the admin user index via users/
users.get('/', function(req, res, next) {
  res.send('Got a GET request at admin/users/');
});

module.exports = users;