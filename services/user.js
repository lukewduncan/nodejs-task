var User = require('../models/user');

exports.signUp = async function(req, res) {
  try {
    var userObject = new User({
      username: req.body.username,
      password: req.body.password
    });

    var user = await userObject.save();
    return user;
  } catch (error) {
    if (!req.body.username || !req.body.password) {
      throw Error("Please include both username and password");
    } else {
      throw Error("Are you trying to sign in? It seems we already have an account with that email.");
    }
  } 
}


exports.signIn = async function(req, res) {
  try {
    var user = await User.findOne({ username: req.body.username })  
    return user; 
  } catch (error) {
    throw Error(error.message) 
  }
}