/* eslint-disable no-undef */
import { expect } from 'chai';

const chai = require('chai');
const spies = require('chai-spies');

chai.use(spies);

const Parrain = require('../gameTemplates/working/LeParrain');

function genReq(type, data) {
  return {
    type,
    status: 'ok',
    data,
  };
}

describe('scenario testing', () => {
  const scenario = Parrain.default;

  const payloadToto = {
    entity: 'player',
    user: 'toto',
    pass: 'pass',
    gameId: '100000',
  };

  const payloadTiti = {
    entity: 'player',
    user: 'titi',
    pass: 'pass',
    gameId: '100000',
  };

  before((done) => {
    // create a first player
    scenario.addPlayer('toto', 'pass', null);
    scenario.handlePlayerUpdate(null, genReq('setRole', { roleName: 'Vito Falcaninio' }), payloadToto);
    // create a second player
    scenario.addPlayer('titi', 'pass', null);
    scenario.handlePlayerUpdate(null, genReq('setRole', { roleName: 'Carla Gurzio' }), payloadTiti);
    done();
  });

  describe('test actions', () => {
    it('should verify that roles are correctly set', (done) => {
      expect(scenario.players[0].role.name).to.equal('Vito Falcaninio');
      expect(scenario.players[1].role.name).to.equal('Carla Gurzio');
      done();
    });

    describe('pickpocket', () => {
      let pick;

      before((done) => {
        pick = scenario.players[0].role.actions.find((a) => a.name == 'Pickpocket');
        expect(pick).to.not.equal(undefined);
        done();
      });

      it('should verify the pickpocket send', (done) => {
        const choices = pick.send(scenario, scenario.players[0]);
        expect(choices).to.be.an('array');
        expect(choices.length).to.equal(1);
        expect(choices[0]).to.have.keys(['message', 'possibilities', 'min', 'max']);
        done();
      });

      it('should verify the pickpocket effect when protected', (done) => {
        const not = chai.spy(scenario.notification);
        const choices = [
          ['Carla Gurzio'],
        ];
        scenario.players[1].setProtected(true);
        scenario.handlePlayerUpdate(null, genReq('actionResult', { actionName: 'Pickpocket', choices }), payloadToto);
        expect(scenario.players[1].getProperties().protected).to.equal(false);
        expect(not).to.be.called();
        done();
      });
    });
  });
});
