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
  let ws; let serverws;
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
        serverws = new Websocket(`ws://localhost:${PORT}`);
        serverws.on('open', () => {
          done();
        });
      });
    });
  });

  after((done) => {
    server.close();
    ws.close();
    serverws.close();
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
        const data = JSON.parse(event);
        expect(data.type).equal('pong');
        expect(data.status).equal('ok');
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
      serverws.send(JSON.stringify(content));

      serverws.once('message', (event) => {
        const data = JSON.parse(event);
        expect(data.type).equal('createGame');
        expect(data.status).equal('ok');

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
        const data = JSON.parse(event);
        expect(data.type).equal('testId');
        expect(data.status).equal('ok');
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
        const data = JSON.parse(event);
        expect(data.type).equal('testId');
        expect(data.status).equal('error');
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
        const data = JSON.parse(event);
        expect(data.type).to.equal('connectGame');
        expect(data.status).to.equal('ok');
        expect(data.data).to.have.keys(['token', 'roles']);
        expect(data.data.roles).to.be.an('array');

        token = data.data.token;

        done();
      });
    });

    it('should set the role pref correctly', (done) => {
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
        const data = JSON.parse(event);
        expect(data.type).to.equal('setRole');
        expect(data.status).to.equal('ok');
        done();
      });
    });

    it('should send update to gameMaster', (done) => {
      const content = {
        type: 'setRole',
        status: 'ok',
        token,
        data: {
          roleName: 'Meurtrier',
        },
      };
      ws.send(JSON.stringify(content));

      serverws.once('message', (event) => {
        const data = JSON.parse(event);
        expect(data.type).to.equal('updatePlayers');
        expect(data.status).to.equal('ok');
        expect(data.data).to.have.key('players');
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
        const data = JSON.parse(event);
        expect(data.type).to.equal('getHomePage');
        expect(data.status).to.equal('ok');
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
        const data = JSON.parse(event);
        expect(data.type).to.be.equal('getHomePage');
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
        const data = JSON.parse(event);
        expect(data.type).to.be.equal('getHomePage');
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

    it('should respond an ok the first player', (done) => {
      const content = {
        type: 'getMyPlayer',
        status: 'ok',
        token,
        data: {},
      };
      ws.send(JSON.stringify(content));

      ws.once('message', (event) => {
        const data = JSON.parse(event);
        expect(data.type).to.be.equal('getMyPlayer');
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
        const data = JSON.parse(event);
        expect(data.type).to.be.equal('getMyPlayer');
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
      serverws.send(JSON.stringify(content));

      serverws.once('message', (event) => {
        const data = JSON.parse(event);
        expect(data.type).to.be.equal('getSetup');
        expect(data.status).to.equal('ok');
        done();
      });
    });
  });

  describe('test setPlayerRole', () => {
    it('should set the player role and respond ok', (done) => {
      const content = {
        type: 'setPlayerRole',
        status: 'ok',
        token: gmToken,
        data: {
          playerName: 'titi',
          roleName: 'Meurtrier',
        },
      };
      serverws.send(JSON.stringify(content));

      serverws.once('message', (event) => {
        const data = JSON.parse(event);
        expect(data.type).to.be.equal('setPlayerRole');
        expect(data.status).to.equal('ok');
        done();
      });
    });

    it('should set the player role and send relaod page to player', (done) => {
      const content = {
        type: 'setPlayerRole',
        status: 'ok',
        token: gmToken,
        data: {
          playerName: 'titi',
          roleName: 'Meurtrier',
        },
      };
      serverws.send(JSON.stringify(content));

      ws.once('message', (event) => {
        const data = JSON.parse(event);
        expect(data.type).to.be.equal('reloadPage');
        expect(data.status).to.equal('ok');
        done();
      });
    });
  });

  describe('test actions', () => {
    it('should handle the action and respond makeAction', (done) => {
      const content = {
        type: 'makeAction',
        status: 'ok',
        token,
        data: {
          actionName: 'Tuer',
        },
      };
      ws.send(JSON.stringify(content));

      ws.once('message', (event) => {
        const data = JSON.parse(event);
        expect(data.type).to.equal('makeAction');
        expect(data.status).to.equal('ok');
        expect(data.data).to.have.key('choices');
        expect(data.data.choices).to.be.an('array');
        expect(data.data.choices[0].possibilities).to.includes('titi');
        done();
      });
    });
  });

  describe('test announce', () => {
    it('should announce first player', (done) => {
      const content = {
        type: 'announce',
        status: 'ok',
        token: gmToken,
        data: {
          message: 'This is an announce !',
        },
      };
      serverws.send(JSON.stringify(content));

      ws.once('message', (event) => {
        const data = JSON.parse(event);
        expect(data.type).to.equal('notification');
        expect(data.status).to.equal('ok');
        expect(data.data).to.have.keys(['message', 'type']);
        expect(data.data.type).to.equal('announce');
        expect(data.data.message).to.be.a('string');
        done();
      });
    });

    it('should send back to server', (done) => {
      const content = {
        type: 'announce',
        status: 'ok',
        token: gmToken,
        data: {
          message: 'This is an announce !',
        },
      };
      serverws.send(JSON.stringify(content));

      serverws.once('message', (event) => {
        const data = JSON.parse(event);
        expect(data.type).to.equal('announce');
        expect(data.status).to.equal('ok');
        done();
      });
    });
  });

  describe('test pause', () => {
    it('should return ok', (done) => {
      const content = {
        type: 'pause',
        status: 'ok',
        token: gmToken,
        data: {
          currentTime: 20000,
        },
      };
      serverws.send(JSON.stringify(content));

      serverws.once('message', (event) => {
        const data = JSON.parse(event);
        expect(data.type).to.equal('pause');
        expect(data.status).to.equal('ok');
        done();
      });
    });
  });

  describe('test resume', () => {
    it('should return the currentTime when paused', (done) => {
      const content = {
        type: 'resume',
        status: 'ok',
        token: gmToken,
        data: {},
      };
      serverws.send(JSON.stringify(content));

      serverws.once('message', (event) => {
        const data = JSON.parse(event);
        expect(data.type).to.equal('resume');
        expect(data.status).to.equal('ok');
        expect(data.data.currentTime).to.equal(20000);
        done();
      });
    });
  });

  describe('test startGame', () => {
    it('should return ok', (done) => {
      const content = {
        type: 'startGame',
        status: 'ok',
        token: gmToken,
        data: {},
      };
      serverws.send(JSON.stringify(content));

      serverws.once('message', (event) => {
        const data = JSON.parse(event);
        expect(data.type).to.equal('startGame');
        expect(data.status).to.equal('ok');
        done();
      });
    });
  });

  describe('test reconnection', () => {
    it('should return an error', (done) => {
      const content = {
        type: 'gmReconnectGame',
        status: 'ok',
        token: null,
        data: {
          gameId,
          playerName: 'qgksdq',
        },
      };
      serverws.send(JSON.stringify(content));

      serverws.once('message', (event) => {
        const data = JSON.parse(event);
        expect(data.type).to.equal('gmReconnectGame');
        expect(data.status).to.equal('error');
        done();
      });
    });

    it('should return the new token', (done) => {
      const content = {
        type: 'gmReconnectGame',
        status: 'ok',
        token: null,
        data: {
          gameId: parseInt(gameId, 10),
          playerName: 'toto',
        },
      };
      serverws.send(JSON.stringify(content));

      serverws.once('message', (event) => {
        const data = JSON.parse(event);
        expect(data.type).to.equal('gmReconnectGame');
        expect(data.status).to.equal('ok');
        expect(data.data.token).to.be.a('string');
        gmToken = data.data.token;
        done();
      });
    });

    it('should accept the new token', (done) => {
      const content = {
        type: 'getSetup',
        status: 'ok',
        token: gmToken,
        data: {},
      };
      serverws.send(JSON.stringify(content));

      serverws.once('message', (event) => {
        const data = JSON.parse(event);
        expect(data.type).to.be.equal('getSetup');
        expect(data.status).to.equal('ok');
        done();
      });
    });
  });

  describe('test getPlayersPage', () => {
    it('should return the list of the roles name', (done) => {
      const content = {
        type: 'getPlayersPage',
        status: 'ok',
        token,
        data: {},
      };
      ws.send(JSON.stringify(content));

      ws.once('message', (event) => {
        const data = JSON.parse(event);
        expect(data.type).to.equal('getPlayersPage');
        expect(data.status).to.equal('ok');
        expect(data.data.charactersName).to.be.an('array');
        expect(data.data.charactersName[0]).to.equal('Meurtrier');
        expect(data.data.charactersPhotos).to.equal(null);
        done();
      });
    });
  });
  describe('test getOverview', () => {
    it('should return the correct elements', (done) => {
      const content = {
        type: 'getOverview',
        status: 'ok',
        token: gmToken,
        data: {},
      };
      serverws.send(JSON.stringify(content));

      serverws.once('message', (event) => {
        const data = JSON.parse(event);
        expect(data.type).to.equal('getOverview');
        expect(data.status).to.equal('ok');
        expect(data.data).to.have.keys(['gameDescription', 'gameId', 'globalDuration', 'remainingDuration', 'players']);
        done();
      });
    });
  });
  describe('test getMyInventoryPage', () => {
    it('should return the list of the names of the objects', (done) => {
      const content = {
        type: 'getMyInventoryPage',
        status: 'ok',
        token,
        data: {},
      };
      ws.send(JSON.stringify(content));

      ws.once('message', (event) => {
        const data = JSON.parse(event);
        expect(data.type).to.equal('getMyInventoryPage');
        expect(data.status).to.equal('ok');
        expect(data.data.characterObject).to.be.an('array');
        done();
      });
    });
  });
});
