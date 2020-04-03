import GameTemplate from './gameTemplate';

const currentGame = new GameTemplate('basicMurder');

// Create roles in the game
const meurtrier = currentGame.addRole('Meurtrier', 'Vous etes un très méchant meurtrier');
let detective;
for (let i = 0; i < 3; i += 1) {
  detective = currentGame.addRole('Detective', 'Vous êtes un gentil détective');
}

// Murderer mission
const kill = (_, others) => {
  others[0].setAlive(false);
  others[0].announce('You have been killed');
};
currentGame.addMission(
  'Tuer tout le monde',
  currentGame.addAction('Tuer', kill, false, 1),
  meurtrier,
  'Vous devez vous débarrasser le plus vite possible de tout les autres joueurs de la partie.',
);

// Detectives mission
const find = (_, others) => {
  others[0].getRole();
};
currentGame.addMission(
  'Trouver le meurtrier en testant les autres joueurs',
  currentGame.addAction('Inspecter', find, false, 1),
  detective,
);

export default currentGame;
