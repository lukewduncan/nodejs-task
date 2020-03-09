var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var cors = require('cors');
var rateLimit = require('express-rate-limit');
var expressLayouts = require("express-ejs-layouts")

var app = express();

// Database
var config = require('./config/database');

// Setup database for test environment and production
if(app.get('env') == "test") {
  mongoose.connect(config.test_database, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
} else {
  mongoose.connect(config.database, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
}

// Rate limiting by IP address
var apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});
// This is for Heroku rate limiting
app.set('trust proxy', 1);
app.use("/api/", apiLimiter);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set("view options", { layout: "views/layout.ejs" });
app.set('view engine', 'ejs');
app.set("etag", false);
app.use(expressLayouts); // add this use()

// Initialize Passport 
app.use(passport.initialize());

var indexRouter = require('./routes/index')
app.use("/", indexRouter);

// Setup API routes
var apiRouter = require('./routes/api')
app.use('/api', apiRouter);

module.exports = serverless(app);
