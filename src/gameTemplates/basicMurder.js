import GameTemplate from './gameTemplate';

const currentGame = new GameTemplate('basicMurder');

// Create roles in the game
const Vito = currentGame.addRole('Vito Falcaninio', 'le bras droit');
const Carla = currentGame.addRole('Carla Gurzio', 'la femme du parrain');
const Petro = currentGame.addRole('Petro Francesco', 'l\'infiltré de la police locale');
const Sebastiano = currentGame.addRole('Sebastiano Pechetto', 'dit le “Chimiste”, responsable des labos de synthèse de drogue');
const Tommaso = currentGame.addRole('Tommaso-Giorgio', 'fils du parrain');
const Sampico = currentGame.addRole('"El Sampico"', 'le meilleur tueur à gage');


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
