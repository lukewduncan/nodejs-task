var User = require("../models/user");
var UserService = require("../services/user");
var jwt = require('jsonwebtoken');
var config = require('../config/database');

exports.signUp = async function(req, res) {
  try {
    var user = await UserService.signUp(req, res);
    return res.status(200).json({ msg: "Successfully created user. Now please send a request to /token using your credentials to receive your API Token"})
  } catch (error) {
    return res.status(400).json({ msg: "There was an error signing up your account. Please make sure you are using a valid email and password." })
  }
}

exports.getToken = async function(req, res) {
  try {
    var user = await UserService.getToken(req, res);
    user.comparePassword(req.body.password, function(error, isMatch) {
      if (isMatch && !error) {
        return res.status(200).json({ token: "JWT " + jwt.sign({ user }, config.secret), msg: "You signed in. Please use this token for further requests." })
      } else {
        return res.status(400).json({ msg: "Retreiving token failed. Please make sure your username and password are correct." })
      }
    });
  } catch (error) {
    return res.status(400).json({ msg: "Receiving token failed. An error occured." })
  }
}