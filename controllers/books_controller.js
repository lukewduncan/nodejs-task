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
    return res.status(200).json({ books: books, user: req.user })
  } catch (error) {
    return res.status(400).json({ msg: error.message })
  }
}

exports.updateBook = async function(req, res) {
  try {
    var updatedBook = await BookService.updateBook(req);
    return res.status(200).json({ data: updatedBook, msg: "Successfully updated book.", user_id: req.user.id})
  } catch (error) {
    return res.status(400).json({ msg: error.message })
  }
}

exports.createBook = async function(req, res) {
  try {
    var user = req.user
    var book = await BookService.createBook(req);
    
    if(book && user) {
      user.books.push(book);
      user.save();
    }
    
    return res.status(200).json({ data: book, msg: "Successfully created book." })
  } catch (error) {
    return res.status(400).json({ msg: error.message })
  }
}