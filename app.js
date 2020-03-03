var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');

// Database
var config = require('./config/database');
mongoose.connect(config.database, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Initialize Passport 
app.use(passport.initialize());

// Welcome response hitting index
app.get('/', function(req, res){
  res.send('Welcome. To get started, please use our REST API')
});

// Setup API routes
var apiRouter = require('./routes/api')
app.use('/api', apiRouter);

module.exports = app;
