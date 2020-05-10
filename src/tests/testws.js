/* eslint-disable global-require */
/* eslint-disable no-undef */
import { expect } from 'chai';
import app from '../app';

const Websocket = require('ws');

// simple test test
describe('Simple String Test', () => {
  it('should return number of charachters in a string', () => {
    expect('Hello world!'.length).equal(12);
  });
});

describe('websocket complete game creation and connection testing', () => {
  let ws;
  let server;
  const PORT = process.env.PORT || 1337;

  let gameId;
  let token;

  before((done) => {
    // start the server
    server = app.listen(PORT, () => {
      ws = new Websocket(`ws://localhost:${PORT}`);
      done();
    });
  });

  after((done) => {
    server.close();
    ws.close();
    done();
  });

  describe('Receive a ping response', () => {
    it('should get a pong response to ping', (done) => {
      const content = {
        type: 'ping',
        status: 'ok',
        data: {},
      };
      ws.send(JSON.stringify(content));

      ws.once('message', (event) => {
        expect(event).to.be.a('String');
        const data = JSON.parse(event);
        expect(data.status).equal('ok');
        expect(data.type).equal('pong');
        done();
      });
    });
  });

  describe('handle correctly the game creation', () => {
    it('should answer the creation message for a gameCreation request', (done) => {
      const content = {
        type: 'createGame',
        status: 'ok',
        token: null,
        data: {
          templateName: 'basicMurder',
        },
      };
      ws.send(JSON.stringify(content));

      ws.once('message', (event) => {
        expect(event).to.be.a('String');
        const data = JSON.parse(event);
        expect(data.status).equal('ok');
        expect(data.type).equal('createGame');
        gameId = data.data.gameId;
        done();
      });
    });
  });

  describe('handle corectly the player connection', () => {
    it('should respond correctly', (done) => {
      const content = {
        type: 'connectGame',
        status: 'ok',
        token: null,
        data: {
          gameId,
          username: 'toto',
          password: 'encrypted',
          roleName: 'Meurtrier',
        },
      };
      ws.send(JSON.stringify(content));

      ws.once('message', (event) => {
        expect(event).to.be.a('string');
        const data = JSON.parse(event);
        expect(data.status).to.equal('ok');
        expect(data.type).to.equal('connectGame');
        expect(data.data).to.have.key('token');
        token = data.data.token;
        done();
      });
    });
  });

  describe('Authenticated player wants his home page', () => {
    it('should respond the right informations', (done) => {
      const content = {
        type: 'getHomePage',
        status: 'ok',
        token,
        data: {},
      };
      ws.send(JSON.stringify(content));

      ws.once('message', (event) => {
        expect(event).to.be.a('string');
        const data = JSON.parse(event);
        expect(data.status).to.equal('ok');
        expect(data.type).to.equal('getHomePage');
        expect(data.data).to.have.keys(['characterName', 'characterFirstName', 'characterPhoto', 'characterSummaryRole', 'characterHints', 'scenarioTitle', 'scenarioSummary']);
        done();
      });
    });
  });

  describe('Unauthenticated player wants his home page', () => {
    it('should respond an error', (done) => {
      const content = {
        type: 'getHomePage',
        status: 'ok',
        token: null,
        data: {},
      };
      ws.send(JSON.stringify(content));

      ws.once('message', (event) => {
        expect(event).to.be.a('string');
        const data = JSON.parse(event);
        expect(data.status).to.equal('error');
        done();
      });
    });
  });
});
