var mongoose = require('mongoose');
var passport = require('passport');
require('../config/passport')(passport);
var express = require('express');
var router = express.Router();

// homepage
router.get('/', function (req, res) {
  res.render('index', {
    title: 'Home'
  });
});

module.exports = router;