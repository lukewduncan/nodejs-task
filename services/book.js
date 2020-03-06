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
    Book.findOne({ id: req.body.id}, function(error, book){
      if(book.created_by == req.user.id) {
        console.log("book belongs to user");
        book.title = req.body.title;
        book.author = req.body.author;
        book.publisher = req.body.publisher;
        book.isbn = req.body.isbn;

        book.save();
      } else {
        console.log(book.created_by);
        console.log(req.user.id);
      }
    })
  } catch (error) {
    throw Error("You do not own this book.")
  }
}

exports.createBook = async function (req) {
  try {
    var user = req.user;
    var bookObject = new Book({
      title: req.body.title,
      author: req.body.author,
      publisher: req.body.publisher,
      isbn: req.body.isbn,
      created_by: req.user.id
    });

    var book = await bookObject.save();
    user.books.push(book);
    user.save();
    
    return book;
  } catch(error) {
    throw Error("Could not create book. Please try again");
  }
}




