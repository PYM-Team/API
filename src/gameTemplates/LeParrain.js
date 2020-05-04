import GameTemplate from './gameTemplate';

const currentGame = new GameTemplate('basicMurder');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Objects
  // El Sampico
const PoemeAmour = new Object(
  'Poème d\'amour', 
  'Un long poème dans lequel El Sampico a mis son don pour l’écriture au service de sa plume afin d’y déverser toute l’intensité de son amour pour Carla, la femme du boss.', 
  true
);
const NoteHotel = new Object(
  'Note de l\'hôtel',
  'Une note de l’hôtel où il a passé la nuit avec Carla le soir du meurtre. Elle aurait été l’alibi parfait si elle ne révélait pas en même temps sa relation secrète et incriminante avec sa dulcinée.',
  false
);
const PaquetCigarettes1 = new Object(
  'Paquet de cigarettes', 
  'Un paquet presque vide de cigarettes italiennes sans filtre au goût amer. El Sampico ne sait pas quoi faire de ses mains tant qu’elles ne sont pas occupées à tenir une clope. ', 
  true
);
const FlasqueTequila = new Object(
  'Flasque de Tequila', 
  'Un petit remontant pour se donner du courage.', 
  false
);
const Flingue1 = new Object(
  'Flingue',
  'Pour El Sampico, cette arme est une extension de sa volonté.', 
  false
);
const SouFetiche = new Object(
  'Sou fétiche', 
  'Un peso brillant lui rappelant sa terre natale, le Mexique.',
  false
);
const basicObjectsSampico = [PoemeAmour, NoteHotel, PaquetCigarettes1, FlasqueTequila, Flingue1, SouFetiche];
  // Petro Francesco
const PaquetCigarettes2 = new Object(
  'Paquet de cigarettes', 
  'Déjà à moitié vide en début de soirée, de la marque italienne Fortuna.',
  false
);
const Briquet = new Object(
  'Briquet', 
  'Un vieux briquet en acier noir, lourdement usé par l’utilisation quotidienne de son propriétaire.', 
  false
);
const LunettesSoleil = new Object(
  'Paire de lunettes de soleil', 
  'Lunettes rondes et sombre qui cache à la perfection le regard mystérieux et ténébreux de l’officier de police. Il les porte même en intérieur, ce qui lui permet de regarder là ou il veut sans se faire facilement repérer.', 
  false
);
const BlocNote = new Object(
  'Bloc-note', 
  'Un bon enquêteur à toujours de quoi noter les information les plus intéressantes qui lui sont proposée. Mais ce carnet n’est pas celui où Petro garde toutes ses notes concernant son enquête… Il serait bien trop risqué de l\'amener à ce genre de soirée.', 
  false
);
const Menottes = new Object(
  'Paire de menottes', 
  'Peuvent être utiliser au cour de la soirée, Petro les cache à l’intérieur de sa veste', 
  false
);
const basicObjectsFrancesco = [PaquetCigarettes2, Briquet, LunettesSoleil, BlocNote, Menottes];
  // Vito Falcaninio
const LettreParrain = new Object(
  'La lettre du parrain', 
  'Cette lettre signée du parrain exprime ses doutes sur son entourage direct. C’est elle qui pousse Vito a réunir tout ce beau monde ce soir', 
  true
);
const Cigare = new Object(
  'Un cigare allumé', 
  '“Jamais sans mon cubain. J’en ai besoin pour réfléchir, et réfléchir je fais que ça.”', 
  false
);
const Flingue2 = new Object(
  'Flingue', 
  'Comme le couteau du boucher ou la plume de l’écrivain : l’outil de travail.', 
  false
);
const ChiffonEnsenglante = new Object(
  'Un chiffon ensanglanté', 
  'Vito a saigné du nez récemment, rien de grave', 
  false
);
const basicObjectsFalcaninio = [LettreParrain, Cigare, Flingue2, ChiffonEnsenglante];
  // Tommaso-Giorgio
const Truc = new Object(
  '', 
  '', 
  false
);



// Places

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
    others[0].setSpied(true);
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
currentGame.addRole('Vito Falcaninio', 'le bras droit', missionVito, basicObjectsFalcaninio);
currentGame.addRole('Carla Gurzio', 'la femme du parrain', missionCarla);
currentGame.addRole('Petro Francesco', 'l\'infiltré de la police locale', missionPetro, basicObjectsFrancesco);
currentGame.addRole('Sebastiano Pechetto', 'dit le “Chimiste”, responsable des labos de synthèse de drogue', missionSebastiano);
currentGame.addRole('Tommaso-Giorgio', 'fils du parrain', missionTommaso);
currentGame.addRole('"El Sampico"', 'le meilleur tueur à gage', missionSampico, basicObjectsSampico);

export default currentGame;
