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
router.post('/', passport.authenticate('jwt', { session: false }), function (req, res) {
  user = req.user
  
  var book = new Book({
    title: req.body.title,
    author: req.body.author,
    publisher: req.body.publisher,
    isbn: req.body.isbn
  });

  book.save(function(error) {
    if(error) {
      return res.json({ success: false, msg: 'Book did not save', error: err })
    }
    if(user) {
      user.books.push(book);
      user.save();
    }
    
    res.json({ success: true, msg: "Book was successfully created for " + user.username })
  })
});

module.exports = router;