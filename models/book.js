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

module.exports = mongoose.model('Book', BookModel);