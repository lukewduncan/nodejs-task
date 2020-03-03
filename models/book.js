var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookModel = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  isbn: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Book', BookModel);