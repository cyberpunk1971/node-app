// 'use strict'
//
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const {app, runServer, closeServer} = require('../server');
// const expect = chai.expect;
// chai.use(chaiHttp);
// describe ('Medication', function() {
//   before(function() {
//     return runServer();
//   });
//   after(function(done) {
//      closeServer();
//      done();
//      });
//      it('should return a medication on GET', function() {
//        return chai.request(app)
//        .get('/medication/:id')
//        .then(function(res) {
//          expect(res).to.have.status(200);
//          expect(res).to.be.json;
//          expect(res.body).to.be.a('array');
//          expect(res.body.length).to.be.above(0);
//          const allKeys = ['id', 'generic_name', 'brand_name', 'route']
//          //what keys to use in const above?
//        })
//      })
//
//   it('should delete a medication on DELETE', function() {
//     return chai.request(app)
//     .get('/medication/:id')
//     .then(function() {
//       return chai.request(app)
//       .delete(`/medication/:id${res.body[0].id}`)
//       .then(function(res) {
//         expect(res).to.have.status(204);
//       });
//     });
//   });
//
// });
