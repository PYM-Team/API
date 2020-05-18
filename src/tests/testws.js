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
  let token2;
  let gmToken;

  before((done) => {
    // start the server
    server = app.listen(PORT, () => {
      ws = new Websocket(`ws://localhost:${PORT}`);
      ws.on('open', () => {
        done();
      });
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
        gmToken = data.data.token;
        done();
      });
    });
  });

  describe('handle correctly testId', () => {
    it('should respond ok status', (done) => {
      const content = {
        type: 'testId',
        status: 'ok',
        token: null,
        data: {
          id: gameId,
        },
      };
      ws.send(JSON.stringify(content));

      ws.once('message', (event) => {
        expect(event).to.be.a('String');
        const data = JSON.parse(event);
        expect(data.status).equal('ok');
        expect(data.type).equal('testId');
        done();
      });
    });

    it('should respond error status', (done) => {
      const content = {
        type: 'testId',
        status: 'ok',
        token: null,
        data: {
          id: 999999,
        },
      };
      ws.send(JSON.stringify(content));

      ws.once('message', (event) => {
        expect(event).to.be.a('String');
        const data = JSON.parse(event);
        expect(data.status).equal('error');
        expect(data.type).equal('testId');
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
        },
      };
      ws.send(JSON.stringify(content));

      ws.once('message', (event) => {
        expect(event).to.be.a('string');
        const data = JSON.parse(event);
        expect(data.status).to.equal('ok');
        expect(data.type).to.equal('connectGame');
        expect(data.data).to.have.keys(['token', 'roles']);
        expect(data.data.roles).to.be.an('array');
        token = data.data.token;
        done();
      });
    });

    it('should set the role correctly', (done) => {
      const content = {
        type: 'setRole',
        status: 'ok',
        token,
        data: {
          roleName: 'Meurtrier',
        },
      };
      ws.send(JSON.stringify(content));

      ws.once('message', (event) => {
        expect(event).to.be.a('string');
        const data = JSON.parse(event);
        expect(data.status).to.equal('ok');
        expect(data.type).to.equal('setRole');
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
        expect(data.data).to.have.keys(['characterName', 'characterPhoto', 'characterSummaryRole', 'characterHints', 'scenarioTitle', 'scenarioSummary']);
        done();
      });
    });
  });

  describe('Unauthenticated player wants his home page', () => {
    it('should respond a no token error', (done) => {
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

    it('should respond an authentication error', (done) => {
      const content = {
        type: 'getHomePage',
        status: 'ok',
        token: 'qdkjhqfjlhsfdjqshd',
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

  describe('test getMyPlayer', () => {
    before((done) => {
      const content = {
        type: 'connectGame',
        status: 'ok',
        token: null,
        data: {
          gameId,
          username: 'titi',
          password: 'encrypted',
        },
      };
      ws.send(JSON.stringify(content));

      ws.once('message', (event) => {
        const data = JSON.parse(event);
        if (data.status == 'ok') {
          token2 = data.data.token;
          done();
        }
      });
    });

    it('should respond an ok', (done) => {
      const content = {
        type: 'getMyPlayer',
        status: 'ok',
        token,
        data: {},
      };
      ws.send(JSON.stringify(content));

      ws.once('message', (event) => {
        expect(event).to.be.a('string');
        const data = JSON.parse(event);
        expect(data.status).to.equal('ok');
        expect(data.data).to.have.key('characterRole');
        done();
      });
    });

    it('should respond an error because player has no role', (done) => {
      const content = {
        type: 'getMyPlayer',
        status: 'ok',
        token: token2,
        data: {},
      };
      ws.send(JSON.stringify(content));

      ws.once('message', (event) => {
        expect(event).to.be.a('string');
        const data = JSON.parse(event);
        expect(data.status).to.equal('error');
        expect(data.data.message).to.equal('Player has no role set');
        done();
      });
    });
  });

  describe('test getSetup', () => {
    it('should respond an ok', (done) => {
      const content = {
        type: 'getSetup',
        status: 'ok',
        token: gmToken,
        data: {},
      };
      ws.send(JSON.stringify(content));

      ws.once('message', (event) => {
        expect(event).to.be.a('string');
        const data = JSON.parse(event);
        expect(data.status).to.equal('ok');
        done();
      });
    });
  });
});
