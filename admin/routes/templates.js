var express = require('express');
var templates = express.Router();

templates.get('/', function(req, res, next) {
  return res.render('pages/templates/index', {title: 'Templates'});
});

templates.get('/buttons', function(req, res, next) {
  return res.render('pages/templates/buttons', {title: 'Templates'});
});

templates.get('/cards', function(req, res, next) {
  return res.render('pages/templates/cards', {title: 'Templates'});
});

templates.get('/charts', function(req, res, next) {
  return res.render('pages/templates/charts', {title: 'Templates'});
});

templates.get('/forgot-password', function(req, res, next) {
  return res.render('pages/templates/forgot-password', {title: 'Templates'});
});

templates.get('/register', function(req, res, next) {
  return res.render('pages/templates/register', {title: 'Templates'});
});

templates.get('/ultilities/animation', function(req, res, next) {
  return res.render('pages/templates/ultilities-animation', {title: 'Templates'});
});

templates.get('/ultilities/border', function(req, res, next) {
  return res.render('pages/templates/ultilities-border', {title: 'Templates'});
});

templates.get('/ultilities/color', function(req, res, next) {
  return res.render('pages/templates/ultilities-color', {title: 'Templates'});
});

templates.get('/ultilities/other', function(req, res, next) {
  return res.render('pages/templates/ultilities-other', {title: 'Templates'});
});


module.exports = templates;