/* eslint-disable no-undef */
import { expect } from 'chai';

const Parrain = require('../gameTemplates/LeParrain');

describe('Scenario testing', () => {
  const scenario = Parrain.default;

  it('should update the players array', (done) => {
    scenario.addPlayer('xXxPussySlayerxXx', 'KILLER2000', null);
    expect(scenario.players.length).to.equal(1);
    done();
  });
});
