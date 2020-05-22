/* eslint-disable no-undef */
import { expect } from 'chai';
import { GameObject } from '../gameElements/gameObject';
import { Player } from '../gameElements/player';
import app from '../app';

const Websocket = require('ws');
const Parrain = require('../gameTemplates/LeParrain');

describe('Scenario testing', () => {
  let ws; let serverws;
  let server;
  const PORT = process.env.PORT || 1337;


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

  it('should have proper results with action Fouiller une pièce', (done) => {
    const place1 = scenario.places.find((element) => element.name == 'Le vestibule');
    const player = new Player('toto', null, ws);
    player.setRole(Object.values(scenario.roles).find((element) => element.name == 'Vito Falcaninio'));
    const action = scenario.actions.find((element) => element.name == 'Fouiller une pièce');
    expect(action.effect(player, place1)).to.equal(null);
    expect(player.role.actions.find((element) => element.name == 'Fouiller une pièce').useNb).to.equal(1);
    const place2 = scenario.places.find((element) => element.name == 'La chambre du parrain');
    done();
  });
});
