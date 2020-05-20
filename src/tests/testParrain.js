/* eslint-disable no-undef */
import { expect } from 'chai';
import { GameObject } from '../gameElements/gameObject';

const Parrain = require('../gameTemplates/LeParrain');

describe('Scenario testing', () => {
  const scenario = Parrain.default;

  it('should update the players array', (done) => {
    scenario.addPlayer('xXxPussySlayerxXx', 'KILLER2000', null);
    expect(scenario.players.length).to.equal(1);
    done();
  });

  it('should have 6 roles in the scenario', (done) => {
    expect(Object.keys(scenario.roles).length).to.equal(6);
    done();
  });

  it('should have 3 places in the scenario', (done) => {
    expect(scenario.places.length).to.equal(3);
    done();
  });

  it('should have specific objects in roles', (done) => {
    const LettreParrain = new GameObject('La lettre du parrain', 'Cette lettre signée du parrain exprime ses doutes sur son entourage direct. C’est elle qui pousse Vito a réunir tout ce beau monde ce soir', true);
    const Cigare = new GameObject('Un cigare allumé', '“Jamais sans mon cubain. J’en ai besoin pour réfléchir, et réfléchir je fais que ça.”', false);
    const Flingue2 = new GameObject('Flingue', 'Comme le couteau du boucher ou la plume de l’écrivain : l’outil de travail.', false);
    const basicObjectsVito = [LettreParrain, Cigare, Flingue2];
    for (let i = 0; i < basicObjectsVito.length; i += 1) {
      expect(basicObjectsVito[i].name).to.equal(scenario.roles['Vito Falcaninio'].basicObjects[i].name);
    }
    done();
  });

  it('should have no objects in le vestibule', (done) => {
    let place;
    const action = scenario.actions.find((element) => element.effect == fouillerPiece);
    scenario.places.forEach((element) => {
      if (element.name == 'Le vestibule') {
        place = element;
      }
    });
    expect()(action.effect(place)).to.equal(null);
    done();
  });
});
