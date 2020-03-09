var User = require('../models/user');
var bcrypt = require('bcrypt');

exports.signUp = async function(req, res) {
  try {
     var saltRounds = 10;

     const salt = bcrypt.genSaltSync(saltRounds);
     const hash = bcrypt.hashSync(req.body.password, salt);

    var userObject = new User({
      username: req.body.username,
      password: hash
    });

    var user = await userObject.save();
    return user;
  } catch (error) {
    if (!req.body.username || !req.body.password) {
      throw Error("Please include both username and password");
    } else {
      throw Error(error);
    }
  } 
}

exports.getToken = async function(req, res) {
  try {
    var user = await User.findOne({ username: req.body.username })  
    return user; 
  } catch (error) {
    throw Error(error.message) 
  }
}