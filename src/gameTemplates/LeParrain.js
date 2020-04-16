import GameTemplate from './gameTemplate';

const currentGame = new GameTemplate('basicMurder');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Actions
const fouillerPiece = (_, others) => {
  others[0].setAlive(false);
  others[0].announce('You have been killed');
};
const pickpocket = (_, others) => {
  a = getRandomInt(3);
  if(a == 0){
    others[0].inventory
  }
  if(a == 1){
    
  }
  if(a == 2){
    
  }
  others[0].announce('You have been killed');
};
const espionnage = (_, others) => {
  others[0].setAlive(false);
  others[0].announce('You have been killed');
};
const potins = (_, others) => {
  others[0].setAlive(false);
  others[0].announce('You have been killed');
};
const refroidir = (_, others) => {
  others[0].setAlive(false);
  others[0].announce('You have been killed');
};
const empoisonner = (_, others) => {
  others[0].setAlive(false);
  others[0].announce('You have been killed');
};
const seProteger = (_, others) => {
  others[0].setAlive(false);
  others[0].announce('You have been killed');
};

// Missions
currentGame.addMission(
  'Tuer tout le monde',
  currentGame.addAction('Tuer', kill, false, 1),
  meurtrier,
  'Vous devez vous débarrasser le plus vite possible de tout les autres joueurs de la partie.',
);

// Create roles in the game
const Vito = currentGame.addRole('Vito Falcaninio', 'le bras droit');
const Carla = currentGame.addRole('Carla Gurzio', 'la femme du parrain');
const Petro = currentGame.addRole('Petro Francesco', 'l\'infiltré de la police locale');
const Sebastiano = currentGame.addRole('Sebastiano Pechetto', 'dit le “Chimiste”, responsable des labos de synthèse de drogue');
const Tommaso = currentGame.addRole('Tommaso-Giorgio', 'fils du parrain');
const Sampico = currentGame.addRole('"El Sampico"', 'le meilleur tueur à gage');

export default currentGame;
