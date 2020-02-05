/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';
const chai = require('chai');

const should = chai.should();
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const server = require('../app.js');

describe('routes : index', () => {
  describe('GET /', () => {
    it('should return correct json', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.status.should.eql('success');
          res.body.message.should.eql('RestAPI homepage !');
          done();
        });
    });
  });
});
