import GameTemplate from './gameTemplate';

const currentGame = new GameTemplate('basicMurder');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Actions
const fouillerPiece = (_, place) => {
  switch (place) {
    case 'Chambre du parrain' :
      break;
    case '' :
      break;
  }
};
const pickpocket = (_, others) => {
  if(others[0].protected == true){
    others[0].setProtected(false);
  } else {  
    a = getRandomInt(3);
    if(a == 0){
      others[0].inventory;
    }
    if(a == 1){
      
    }
    if(a == 2){
      
    }
    others[0].announce('You have been killed');
  }
};
const espionnage = (_, others) => {
  if(others[0].protected == true){
    others[0].setProtected(false);
  } else {
    others[0].setAlive(false);
    others[0].announce('You have been killed');
  }
};
const potins = (_, others) => {
  if(others[0].protected == true){
    others[0].setProtected(false);
  } else {
    a = getRandomInt(2);
    if(a==0){
      switch (others[0]) {
        case '':
          break;
      }
    } else {
      switch (others) {
        case '':
          break;
      }
    }
  }
};
const refroidir = (_, others) => {
  if(others[0].protected == true){
    others[0].setProtected(false);
  } else {
    others[0].setAlive(false);
    others[0].announce('You have been killed');
  }
};
const empoisonner = (_, others) => {
  if(others[0].protected == true){
    others[0].setProtected(false);
  } else {
    others[0].setAlive(false);
    others[0].announce('You have been killed');
  }
};
const seProteger = (you, _) => {
  you.setProtected(true);
  you.announce('You are protected');
};

// Missions
const missionVito = new Mission(
  'Tuer tout le monde',
  currentGame.addAction('Tuer', kill, false, 1),
  'Vous devez vous débarrasser le plus vite possible de tout les autres joueurs de la partie.',
);
const missionCarla = new Mission(
  'Tuer tout le monde',
  currentGame.addAction('Tuer', kill, false, 1),
  'Vous devez vous débarrasser le plus vite possible de tout les autres joueurs de la partie.',
);
const missionPetro = new Mission(
  'Tuer tout le monde',
  currentGame.addAction('Tuer', kill, false, 1),
  'Vous devez vous débarrasser le plus vite possible de tout les autres joueurs de la partie.',
);
const missionSebastiano = new Mission(
  'Tuer tout le monde',
  currentGame.addAction('Tuer', kill, false, 1),
  'Vous devez vous débarrasser le plus vite possible de tout les autres joueurs de la partie.',
);
const missionTommaso = new Mission(
  'Tuer tout le monde',
  currentGame.addAction('Tuer', kill, false, 1),
  'Vous devez vous débarrasser le plus vite possible de tout les autres joueurs de la partie.',
);
const missionSampico = new Mission(
  'Tuer tout le monde',
  currentGame.addAction('Tuer', kill, false, 1),
  'Vous devez vous débarrasser le plus vite possible de tout les autres joueurs de la partie.',
);

// Create roles in the game
currentGame.addRole('Vito Falcaninio', 'le bras droit', missionVito);
currentGame.addRole('Carla Gurzio', 'la femme du parrain');
currentGame.addRole('Petro Francesco', 'l\'infiltré de la police locale');
currentGame.addRole('Sebastiano Pechetto', 'dit le “Chimiste”, responsable des labos de synthèse de drogue');
currentGame.addRole('Tommaso-Giorgio', 'fils du parrain');
currentGame.addRole('"El Sampico"', 'le meilleur tueur à gage');

export default currentGame;
