var Book = require('../models/book');
var User = require('../models/user');

exports.getUserBooks = async function(req) {
  try {
    var books = await User.findById(req.user.id).populate('books');
    return books
  } catch (error) {
    throw Error("Could not get users books");
  }
}

exports.getAllBooks = async function() {
  try {
    var books = await Book.find();
    return books;
  } catch (error) {
    throw Error("Could not get all books from database");
  }
}

exports.updateBook = async function(req) {
  try {
    var book = await Book.findById(req.params.id).exec();

    if(book.confirmOwnership(req.user)) {
      book.title = req.body.title;
      book.author = req.body.author;
      book.publisher = req.body.publisher;
      book.isbn = req.body.isbn;

      var book = book.save();
      return book;
    } else {
      throw Error("You do not own this book #1.");
    }
  } catch (error) {
    throw Error("You do not own this book #2.");
  }
}

exports.createBook = async function(req) {
  try {
    var user = req.user;
    var bookObject = new Book({
      title: req.body.title,
      author: req.body.author,
      publisher: req.body.publisher,
      isbn: req.body.isbn,
      created_by: user.id
    });

    var book = await bookObject.save();
    user.books.push(book);
    user.save();
    
    return book;
  } catch(error) {
    throw Error("Could not create book. Please try again");
  }
}

exports.deleteBook = async function(req) {
  try {
    var book = await Book.findById(req.params.id).exec();

    if(book.confirmOwnership(req.user)) {
      book.remove();
      return book;
    }
  } catch (error) {
    throw Error(error);
  }
}




