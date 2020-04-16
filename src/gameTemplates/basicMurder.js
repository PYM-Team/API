import GameTemplate from './gameTemplate';
import Mission from '../gameElements/modules/mission';

const currentGame = new GameTemplate('basicMurder');


// Murderer mission
const kill = (_, others) => {
  others[0].setAlive(false);
  others[0].announce('You have been killed');
};
const missionMeurtrier = new Mission(
  'Tuer tout le monde',
  currentGame.addAction('Tuer', kill, false, 1),
  'Vous devez vous débarrasser le plus vite possible de tout les autres joueurs de la partie.',
);

// Detectives mission
const find = (_, others) => {
  others[0].getRole();
};
const missionDetective = new Mission(
  'Trouver le meurtrier en testant les autres joueurs',
  currentGame.addAction('Inspecter', find, false, 1),
);

// Create roles in the game
currentGame.addRole('Meurtrier', 'Vous êtes un très méchant meurtrier', missionMeurtrier);
for (let i = 0; i < 3; i += 1) {
  currentGame.addRole('Detective', 'Vous êtes un gentil détective', missionDetective);
}

export default currentGame;
