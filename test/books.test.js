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

  before((done) => {
    testUtilities.authenticateUser(app)
      .then((accessToken) => {
        jwt = accessToken;
        return done();
      })
  })

  it("GET /api/books/all - should get unauthorized", function() {
    return chai.request(app)
      .get('/api/books/all')
      .set("Authorization", "")
      .then((res) => {
        res.should.have.status(401);
      });
  });

  it("GET /api/books/all - should get all books", function() {
    return chai.request(app)
      .get('/api/books/all')
      .set("Authorization", jwt)
      .then((res) => {
        res.should.have.status(200);
      });
  });

  it("GET /api/books - should get all books belonging to user", function() {
    return chai.request(app)
      .get('/api/books')
      .set("Authorization", jwt)
      .then((res) => {
        res.should.have.status(200);
      });
  })

  it("POST /api/books - should create a new book", function(){
    var bookObject = new Book({
      title: "test",
      author: "author123",
      publisher: "publisher123",
      isbn: 1111111111
    });

    return chai.request(app)
      .post('/api/books')
      .set("Authorization", jwt)
      .send(bookObject)
      .then((res) => {
        res.should.have.status(200);
      });
  })

  it("PUTS /api/books/:id - should update book", function(){
    var bookObject = new Book({
      title: "test",
      author: "author321",
      publisher: "publisher321",
      isbn: 99999999
    });

    Book.findOne({}, {}, { sort: { 'created_at': -1 } }, function (err, book) {
      return chai.request(app)
        .put('/api/books/' + book.id)
        .set("Authorization", jwt)
        .send(bookObject)
        .then((res) => {
          res.should.have.status(200);
        });
    });
  });
})