var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../../config/database');
require('../../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../../models/user");
var Book = require("../../models/book");

// GET api/books
router.get('/', passport.authenticate('jwt', { session: false }), function (req, res) {
  res.json("view all books created")
});

// POST api/books
router.get('/', passport.authenticate('jwt', { session: false }), function (req, res) {
  res.json("create a book")
});

module.exports = router;