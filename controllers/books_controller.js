var BookService = require("../services/book");

exports.getUserBooks = async function(req, res) {
  try {
    var user = await BookService.getUserBooks(req);
    return res.status(200).json({ books: user.books })
  } catch (error) {
    return res.status(400).json({ msg: error.message })
  }
}

exports.getAllBooks = async function(req, res) {
  try {
    var books = await BookService.getAllBooks(req);
    return res.status(200).json({ books: books });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
}

exports.updateBook = async function(req, res) {
  try {
    var updatedBook = await BookService.updateBook(req);
    return res.status(200).json({ book: updatedBook, msg: "Successfully updated book." })
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
}

exports.createBook = async function(req, res) {
  try {
    var book = await BookService.createBook(req);
    return res.status(200).json({ book: book, msg: "Successfully created book." });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
}

exports.deleteBook = async function(req, res) {
  try {
    var book = await BookService.deleteBook(req);
    return res.status(200).json({ msg: "Succesfully deleted " + book.title + " book." });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
}