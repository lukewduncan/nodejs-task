var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookModel = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
  },
  publisher: {
    type: String,
  },
  isbn: {
    type: Number,
  },
  created_by: {
    type: String,
    required: true
  }
});

// Removes references when Book is removed
BookModel.pre('remove', function(next) {
  var book = this;
  book.model('User').update(
    { books: book._id },
    { $pull: { books: book._id }},
    { multi: true },
    next
  );
});

BookModel.methods.confirmOwnership = function (user) {
  var book = this;
  if (user.admin || book.created_by == user.id) {
    return true;
  }
};

module.exports = mongoose.model('Book', BookModel);