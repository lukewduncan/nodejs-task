var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

// For times sake: https://stackoverflow.com/a/9204568/3255845
function validateEmail(email) {
  var regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}

var UserModel = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    lowercase: true,
    validate: [validateEmail, 'Please make sure you are using a valid email address.'],
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  },
  books: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Book'
  }]
});

UserModel.pre('save', function (next, done) {
  var user = this;
  var saltRounds = 10;

  bcrypt.hash(user.password, saltRounds, function (error, hash) {
    if (error) {
      return next(error);
    }

    user.password = hash;
    user.save(function(error, user) {
      next();
    });
  });
});

UserModel.methods.comparePassword = function (password, callback) {
  var user = this;
  bcrypt.compare(password, user.password, function (error, isMatch) {
    if (error) {
      return callback(error);
    }
    callback(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserModel);