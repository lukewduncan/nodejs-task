process.env.NODE_ENV = "test";

var app = require("../app");
var chai = require("chai");
var chaiHttp = require("chai-http");

const userCredentials = {
  username: "luke.will.duncan+" + Date.now() + "@gmail.com",
  password: '123123'
}

exports.authenticateUser = (app) =>
  new Promise((resolve, reject) => {
    chai.request(app)
      .post('/api/signup')
      .send(userCredentials)
      .then((res) => {
        chai.request(app)
          .post('/api/token')
          .send(userCredentials)
          .end((err, res) => {
            if (err) {
              return reject(err);
            }
            return resolve(res.body.token);
          });
      }) 
  });