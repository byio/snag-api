const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../app');

// tests
describe('API endpoint /users', function () {

  // GET - fetch all users
  it('should return all users', function () {
    return chai.request(app)
      .get('/users')
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
      })
  });

});
