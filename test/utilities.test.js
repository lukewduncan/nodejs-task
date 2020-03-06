process.env.NODE_ENV = "test";
var chai = require("chai");

const userCredentials = {
  username: "luke.will.duncan+" + Date.now() + "@gmail.com",
  password: '123123'
}

// Simulates user signup and then proceed to token
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