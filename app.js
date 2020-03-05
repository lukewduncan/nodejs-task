var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var cors = require('cors');

var app = express();

// Database
var config = require('./config/database');

if(app.get('env') == "test") {
  mongoose.connect(config.test_database, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
} else {
  mongoose.connect(config.database, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Initialize Passport 
app.use(passport.initialize());

// Setup API routes
var apiRouter = require('./routes/api')
app.use('/api', apiRouter);

module.exports = app;
