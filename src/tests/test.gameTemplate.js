/* eslint-disable no-console */
/* eslint-disable global-require */
/* eslint-disable no-undef */
import { expect } from 'chai';
import GameTemplate from '../gameTemplates/gameTemplate';
import { Player } from '../gameElements/player';

describe('Units tests for the gameTemplate file functions', () => {
  const game = new GameTemplate('test');
  const pl = new Player('toto', 'encrypted', null);
  game.players.push(pl);

  describe('Testing getPlayerFromName', () => {
    it('should respond the right player', (done) => {
      game.getPlayerFromName('toto')
        .then((p) => {
          expect(p).to.be.equal(pl);
          done();
        })
        .catch((err) => {
          console.log(err);
        });
    });

    it('should respond an error', (done) => {
      game.getPlayerFromName('blabal')
        .then((p) => {
          console.log(p);
        })
        .catch((err) => {
          expect(err).to.be.not.equal(null);
          done();
        });
    });
  });
});
