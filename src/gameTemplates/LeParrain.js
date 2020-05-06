import GameTemplate from './gameTemplate';
import { Object } from '../gameElements/object';
import { Place } from '../gameElements/place';
import { Role } from '../gameElements/role';
import { Player } from '../gameElements/player';
import { Mission } from '../gameElements/modules/mission';
import { Action } from '../gameElements/action';

const currentGame = new GameTemplate('basicMurder');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Objects
// El Sampico
const PoemeAmour = {
  name: 'Poème d\'amour',
  description: 'Un long poème dans lequel El Sampico a mis son don pour l’écriture au service de sa plume afin d’y déverser toute l’intensité de son amour pour Carla, la femme du boss.',
  clue: true,
};
const NoteHotel = {
  name: 'Note de l\'hôtel',
  description: 'Une note de l’hôtel où il a passé la nuit avec Carla le soir du meurtre. Elle aurait été l’alibi parfait si elle ne révélait pas en même temps sa relation secrète et incriminante avec sa dulcinée.',
  clue: false,
};
const PaquetCigarettes1 = {
  name: 'Paquet de cigarettes',
  description: 'Un paquet presque vide de cigarettes italiennes sans filtre au goût amer. El Sampico ne sait pas quoi faire de ses mains tant qu’elles ne sont pas occupées à tenir une clope. ',
  clue: true,
};
const FlasqueTequila = {
  name: 'Flasque de Tequila',
  description: 'Un petit remontant pour se donner du courage.',
  clue: false,
};
const Flingue1 = {
  name: 'Flingue',
  description: 'Pour El Sampico, cette arme est une extension de sa volonté.',
  clue: false,
};
const SouFetiche = {
  name: 'Sou fétiche',
  description: 'Un peso brillant lui rappelant sa terre natale, le Mexique.',
  clue: false,
};
const basicObjectsSampico = [PoemeAmour, NoteHotel, PaquetCigarettes1, FlasqueTequila, Flingue1,
  SouFetiche];
// Petro Francesco
const PaquetCigarettes2 = {
  name: 'Paquet de cigarettes',
  description: 'Déjà à moitié vide en début de soirée, de la marque italienne Fortuna.',
  clue: false,
};
const Briquet = {
  name: 'Briquet',
  descritpion: 'Un vieux briquet en acier noir, lourdement usé par l’utilisation quotidienne de son propriétaire.',
  clue: false,
};
const LunettesSoleil = {
  name: 'Paire de lunettes de soleil',
  description: 'Lunettes rondes et sombre qui cache à la perfection le regard mystérieux et ténébreux de l’officier de police. Il les porte même en intérieur, ce qui lui permet de regarder là ou il veut sans se faire facilement repérer.',
  clue: false,
};
const BlocNote = {
  name: 'Bloc-note',
  description: 'Un bon enquêteur à toujours de quoi noter les information les plus intéressantes qui lui sont proposée. Mais ce carnet n’est pas celui où Petro garde toutes ses notes concernant son enquête… Il serait bien trop risqué de l\'amener à ce genre de soirée.',
  clue: false,
};
const Menottes = {
  name: 'Paire de menottes',
  description: 'Peuvent être utiliser au cour de la soirée, Petro les cache à l’intérieur de sa veste',
  clue: true,
};
const basicObjectsFrancesco = [PaquetCigarettes2, Briquet, LunettesSoleil, BlocNote, Menottes];
// Vito Falcaninio
const LettreParrain = {
  name: 'La lettre du parrain',
  description: 'Cette lettre signée du parrain exprime ses doutes sur son entourage direct. C’est elle qui pousse Vito a réunir tout ce beau monde ce soir',
  clue: true,
};
const Cigare = {
  name: 'Un cigare allumé',
  description: '“Jamais sans mon cubain. J’en ai besoin pour réfléchir, et réfléchir je fais que ça.”',
  clue: false,
};
const Flingue2 = {
  name: 'Flingue',
  description: 'Comme le couteau du boucher ou la plume de l’écrivain : l’outil de travail.',
  clue: false,
};
const basicObjectsFalcaninio = [LettreParrain, Cigare, Flingue2];
// Tommaso-Giorgio
const Truc = {
  name: '',
  description: '',
  clue: false,
};


// Places
const ChambreParrain = {
  name: 'La chambre du parrain',
  description: '',
  objects: [],
};
const Labo = {
  name: 'Le laboratoire du chimiste',
  description: '',
  objects: [],
};
const Piece = {
  name: 'La pièce d\'à côté',
  description: '',
  objects: [],
};

// Actions
const fouillerPiece = (_, place) => {
  switch (place.name) {
    case 'La chambre du parrain':
      break;
    case 'Le  laboratoire du chimiste':
      break;
    case 'La pièce d\'à côté':
      break;
    default:
      break;
  }
};
const pickpocket = (_, others) => {
  if (others[0].protected == true) {
    others[0].setProtected(false);
  } else {
    const a = getRandomInt(3);
    if (a == 0) {
      
    }
    if (a == 1) {

    }
    if (a == 2) {

    }
    others[0].announce('You have been killed');
  }
};
const espionnage = (_, others) => {
  if (others[0].protected == true) {
    others[0].setProtected(false);
  } else {
    others[0].setSpied(true);
    others[0].announce('You have been killed');
  }
};
const potins = (_, others) => {
  if (others[0].protected == true) {
    others[0].setProtected(false);
  } else {
    const a = getRandomInt(2);
    if (a == 0) {
      switch (others[0]) {
        case '':
          break;
        default:
          break;
      }
    } else {
      switch (others) {
        case '':
          break;
        default:
          break;
      }
    }
  }
};
const refroidir = (_, others) => {
  if (others[0].protected == true) {
    others[0].setProtected(false);
  } else {
    others[0].setAlive(false);
    others[0].announce('You have been killed');
  }
};
const empoisonner = (_, others) => {
  if (others[0].protected == true) {
    others[0].setProtected(false);
  } else {
    others[0].setAlive(false);
    others[0].announce('You have been killed');
  }
};
const seProteger = (you) => {
  you.setProtected(true);
  you.announce('You are protected');
};

// Missions
const missionVito = new Mission(
  'Tuer tout le monde',
  currentGame.addAction('Tuer', fouillerPiece, false, 1),
  'Vous devez vous débarrasser le plus vite possible de tout les autres joueurs de la partie.',
);
const missionCarla = new Mission(
  'Tuer tout le monde',
  currentGame.addAction('Tuer', fouillerPiece, false, 1),
  'Vous devez vous débarrasser le plus vite possible de tout les autres joueurs de la partie.',
);
const missionPetro = new Mission(
  'Tuer tout le monde',
  currentGame.addAction('Tuer', fouillerPiece, false, 1),
  'Vous devez vous débarrasser le plus vite possible de tout les autres joueurs de la partie.',
);
const missionSebastiano = new Mission(
  'Tuer tout le monde',
  currentGame.addAction('Tuer', fouillerPiece, false, 1),
  'Vous devez vous débarrasser le plus vite possible de tout les autres joueurs de la partie.',
);
const missionTommaso = new Mission(
  'Tuer tout le monde',
  currentGame.addAction('Tuer', fouillerPiece, false, 1),
  'Vous devez vous débarrasser le plus vite possible de tout les autres joueurs de la partie.',
);
const missionSampico = new Mission(
  'Tuer tout le monde',
  currentGame.addAction('Tuer', fouillerPiece, false, 1),
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
