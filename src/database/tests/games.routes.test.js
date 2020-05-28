/* eslint-disable no-undef */
import { should as _should, use, request } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../index';
import '@babel/polyfill';

process.env.NODE_ENV = 'test';

const should = _should();

use(chaiHttp);

describe('routes : running games', () => {
  describe('POST /games without any body', () => {
    it('should return a bad request status (400) ', (done) => {
      request(server)
        .post('/games')
        .end((err, res) => {
          res.status.should.eql(400);
          done();
        });
    });
  });

  describe('GET /games', () => {
    it('should return correct json', (done) => {
      request(server)
        .get('/games')
        .end((err, res) => {
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.status.should.eql('success');
          done();
        });
    });
  });

  describe('GET /games?id=1', () => {
    it('should return the game 1 json', (done) => {
      request(server)
        .get('/games?id=1')
        .end((err, res) => {
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.status.should.eql('success');
        });
      done();
    });
  });
});
