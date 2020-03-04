var User = require("../models/user");
var UserService = require("../services/user");
var jwt = require('jsonwebtoken');
var config = require('../config/database');

exports.signUp = async function(req, res) {
  try {
    var user = await UserService.signUp(req, res);
    return res.status(200).json({ data: user, msg: "Successfully created user. Now please sign in to receive your API Token"})
  } catch (error) {
    return res.status(400).json({ msg: error.message })
  }
}

exports.signIn = async function(req, res) {
  try {
    var user = await UserService.signIn(req, res);
    user.comparePassword(req.body.password, function(error, isMatch) {
      if (isMatch && !error) {
        return res.status(200).json({ user: user, success: true, token: "JWT " + jwt.sign({ user }, config.secret), msg: "You signed in. Please use this token for further requests." })
      } else {
        return res.status(400).json({ success: false, msg: isMatch })
      }
    });
  } catch (error) {
    return res.status(400).json({ msg: error.message })
  }
}