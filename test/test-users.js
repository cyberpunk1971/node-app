'use strict'

const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server');
const expect = chai.expect;
chai.use(chaiHttp);
describe ('Users', function() {
  before(function() {
    return runServer();
  });
  after(function(done) {
     closeServer();
     done();
     });

  it('should list users on GET', function(done) {
     chai.request(app)
    .get('/api/users')
    .then(function(res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.a('array');
      expect(res.body.length).to.be.above(0);
      res.body.forEach(function(item) {
        expect(item).to.be.a('object');
        expect(item).to.have.all.keys(
          'firstname', 'id', 'lastname', 'medications', 'username');
        });
      done();
    })
    .catch(function(err) {
      console.log(err);
    });
  });

});
