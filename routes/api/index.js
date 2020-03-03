var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");
var Book = require("../models/book");

// api/signup - register to get account
router.post("/signup", function (req, res) {
  
});

// api/signin - signin to receive JWT for future requests
router.post('/signin', function (req, res) {
  
});

// Book Routes
router.use('/books', require('./books'));

module.exports = router;