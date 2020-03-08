process.env.NODE_ENV = "test";
var app = require("../app");
var chai = require("chai");
var chaiHttp = require("chai-http");
var testUtilities = require('./utilities.test');
var Book = require('../models/book');

chai.use(chaiHttp);
chai.should();

describe("CRUD API - Books", function () {
  var jwt = null;

  // before hook to create user and get jwt token
  before((done) => {
    testUtilities.authenticateUser(app)
      .then((accessToken) => {
        jwt = accessToken;
        // delete all books before running tests
        Book.deleteMany({}, err => console.log(err));
        return done();
      });
  });
  
  describe("GET requests", function() {
    it("GET /api/books/all - should get unauthorized", function () {
      return chai.request(app)
        .get('/api/books/all')
        .set("Authorization", "")
        .then((res) => {
          res.should.have.status(401);
        });
    });

    it("GET /api/books/all - should get all books", function () {
      return chai.request(app)
        .get('/api/books/all')
        .set("Authorization", jwt)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.have.keys('books');
        });
    });

    it("GET /api/books - should get all books belonging to user", function () {
      return chai.request(app)
        .get('/api/books')
        .set("Authorization", jwt)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.have.keys('books');
        });
    })
  });
  
  describe("POST requests", function () {
    var bookObject = new Book({
      title: "test",
      author: "author123",
      publisher: "publisher123",
      isbn: 1111111111
    });

    it("POST /api/books - should create a new book", function(){
      return chai.request(app)
        .post('/api/books')
        .set("Authorization", jwt)
        .send(bookObject)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.have.keys('book', 'msg');
        });
    });

    it("POST /api/books - should get unauthorized", function(){
      return chai.request(app)
        .post('/api/books')
        .set("Authorization", "")
        .send(bookObject)
        .then((res) => {
          res.should.have.status(401);
        });
    })
  });

  describe("PUTS requests", function() {
    var book_id = null;

    before((done) => {
      var bookObject = new Book({
        title: "PUTS REQUEST",
        author: "Luke Duncan",
        publisher: "publisher Luke",
        isbn: 1111111111
      });

      chai.request(app)
        .post('/api/books')
        .set("Authorization", jwt)
        .send(bookObject)
        .then((res) => {
          book_id = res.body.book._id;
          return done();
        });
    })

    it("PUTS /api/books/:id - should update book", function () {
      var bookObject = {
        title: "PUTS REQUEST MADE"
      };

      return chai.request(app)
        .put('/api/books/' + book_id)
        .set("Authorization", jwt)
        .send(bookObject)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.have.keys('book', 'msg');
          res.body.book.title.should.equal("PUTS REQUEST MADE");
        });
    });
  });

  describe("DELETE requests", function () {
    var book_id = null;

    before((done) => {
      var bookObject = new Book({
        title: "DELETE REQUEST",
        author: "Luke Duncan",
        publisher: "publisher Luke",
        isbn: 1111111111
      });

      chai.request(app)
        .post('/api/books')
        .set("Authorization", jwt)
        .send(bookObject)
        .then((res) => {
          book_id = res.body.book._id;
          return done();
        });
    })

    it("DELETE /api/books - should get unauthorized", function () {
      return chai.request(app)
        .delete('/api/books/' + book_id)
        .set("Authorization", jwt)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.have.keys('msg');
          res.body.msg.should.equal("Succesfully deleted DELETE REQUEST book.")
        });
    })
  });
});