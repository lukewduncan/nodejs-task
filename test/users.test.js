process.env.NODE_ENV = "test";
var app = require("../app");
var chai = require("chai");
var chaiHttp = require("chai-http");
var testUtilities = require('./utilities.test');
var Book = require('../models/book');

chai.use(chaiHttp);
chai.should();

describe("User", function () {

  describe("POST /api/signup", function () {
    it("should create account succesfully", function () {
      chai.request(app)
        .post('/api/signup')
        .send({ username: "luke.will.duncan+" + Date.now() + "@gmail.com", password: '123123'})
        .then((res) => {
          res.should.have.status(200);
          res.body.should.have.keys('msg');
          res.body.msg.should.equal("Successfully created user. Now please send a request to /token using your credentials to receive your API Token");
        });
    });

    it("should fail because password was not provided", function () {
      chai.request(app)
        .post('/api/signup')
        .send({ username: "luke.will.duncan+" + Date.now() + "@gmail.com" })
        .then((res) => {
          res.should.have.status(400);
          res.body.msg.should.equal("Please include both username and password");
        });
    });

    it("should fail because email is not valid", function () {
      chai.request(app)
        .post('/api/signup')
        .send({ username: "luke.will.duncan", password: "123123" })
        .then((res) => {
          res.should.have.status(400);
          res.body.msg.should.equal("ValidationError: username: Please make sure you are using a valid email address.");
        });
    });
  });

  describe("POST /api/token", function(){
    var userDetails = { username: "luke.will.duncan" + Date.now() + 1 + "@gmail.com", password: "123123" }

    before((done) => {
      chai.request(app)
        .post('/api/signup')
        .send(userDetails)
        .then((res) => {
          return done();
        });
    })

    it("should return JWT token succesfully", function () {
      chai.request(app)
        .post('/api/token')
        .send(userDetails)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.have.keys('msg', 'token');
          res.body.token.should.include('JWT');
        });
    });

    it("should fail if user credentials are wrong", function () {
      chai.request(app)
        .post('/api/token')
        // password is wrong
        .send({ username: "luke.will.duncan" + Date.now() + 1 + "@gmail.com", password: "11111" })
        .then((res) => {
          res.should.have.status(400);
          res.body.msg.should.equal("Receiving token failed. An error occured.")
        });
    });
  });
})