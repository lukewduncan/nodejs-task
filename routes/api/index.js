var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../../config/database');
require('../../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../../models/user");
var Book = require("../../models/book");

// api/signup - register to get account
router.post("/signup", function (req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({ success: false, msg: 'Please include both username and password in your request.' });
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    // save the user
    newUser.save(function (err) {
      if (err) {
        return res.json({ success: false, msg: 'Username is invalid. Please select another username.' });
      }
      res.json({ success: true, msg: 'Your account has been created!', user: newUser });
    });
  }
});

// api/signin - signin to receive JWT for future requests
router.post('/signin', function (req, res) {
  User.findOne({
    username: req.body.username
  }, function (err, user) {
    if (err) {
      throw err;
    }

    if (!user) {
      res.status(401).send({ success: false, msg: 'Signin failed.' });
    } else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          var token = jwt.sign(user, config.secret);
          res.json({ success: true, token: 'JWT ' + token });
        } else {
          res.status(401).send({ success: false, msg: 'Authentication failed.' });
        }
      });
    }
  });
});

// Book Routes
router.use('/books', require('./books'));

module.exports = router;