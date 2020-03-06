var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
var User = require('../models/user');
var config = require('../config/database'); // get db config file

module.exports = function (passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    console.log("JWT PAYLOAD!");
    console.log(jwt_payload);
    User.findOne({ username: jwt_payload.user.username }, function (error, user) {
      if (error) {
        return done(error, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};