var mongoose = require('mongoose');
var passport = require('passport');
require('../../config/passport')(passport);
var express = require('express');
var router = express.Router();
var Book = require("../../models/book");
var BooksController = require("../../controllers/books_controller");

// api/books
router.get('/', passport.authenticate('jwt', { session: false }), BooksController.getUserBooks);
router.post('/', passport.authenticate('jwt', { session: false }), BooksController.createBook);

// api/books/:id
// router.get('/:id', passport.authenticate('jwt', { session: false }), BooksController.getBook);
router.put('/:id', passport.authenticate('jwt', { session: false }), BooksController.updateBook);
router.delete('/:id', passport.authenticate('jwt', { session: false }), BooksController.deleteBook);

// api/books/all
router.get('/all', passport.authenticate('jwt', { session: false }), BooksController.getAllBooks);

module.exports = router;