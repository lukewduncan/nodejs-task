var mongoose = require('mongoose');
var passport = require('passport');
require('../../config/passport')(passport);
var express = require('express');
var router = express.Router();
var User = require("../../models/user");
var UserController = require("../../controllers/users_controller");

// api/signup - register to get account
router.post("/signup", UserController.signUp);
router.post('/token', UserController.getToken);

// Book Routes
router.use('/books', require('./books'));

module.exports = router;