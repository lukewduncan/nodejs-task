process.env.NODE_ENV = "test";

var app = require("../app");
var chai = require("chai");
var chaiHttp = require("chai-http");
var testUtilities = require('./utilities.test');

chai.use(chaiHttp);
chai.should();

describe("CRUD API - Books", function () {
  let jwt = null;

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
})