var mongoose = require('mongoose');
var passport = require('passport');
require('../../config/passport')(passport);
var express = require('express');
var router = express.Router();
var Book = require("../../models/book");
var BooksController = require("../../controllers/books_controller");

// GET api/books
router.get('/', passport.authenticate('jwt', { session: false }), BooksController.getUserBooks);

// // PUT api/books/:id
// router.put('/:id', passport.authenticate('jwt', { session: false }), BooksController.updateBook);

// GET api/books/all
router.get('/all', passport.authenticate('jwt', { session: false }), BooksController.getAllBooks);

// POST api/books
router.post('/', passport.authenticate('jwt', { session: false }), BooksController.createBook);

module.exports = router;