import GameTemplate from '../gameTemplate';
import { GameObject } from '../../gameElements/gameObject';
import { Place } from '../../gameElements/place';
import { Role } from '../../gameElements/role';
import { Player } from '../../gameElements/player';
import { Mission } from '../../gameElements/modules/mission';
import { Action } from '../../gameElements/action';

const currentGame = new GameTemplate('LeParrain');

let desc = 'Cette enquête se déroule dans les années 30, en plein coeur de la mafia italienne. Le parrain Don Giorgio a été assassiné. ';
desc += 'Qui a pu commettre une telle atrocité ? Qui va hériter de son empire et de sa fortune ? Toutes ces questions trouveront leur réponse ce soir.';
currentGame.setDescription(desc);

currentGame.setSummary('Don Giorgio, baron de la drogue et parrain de la pègre locale, a rendu l\'âme. A qui profite le crime ? ');

// Events

currentGame.addEvent(
  'Mort du parrain',
  0,
  'Le parrrain est mort ! C\'est chaud frère',
);

currentGame.addEvent(
  'Resurrection du parrain',
  1,
  'Comme jesus tout est bien qui finit bien',
);

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Objects
// El Sampico
const PoemeAmour = new GameObject(
  'Poème d\'amour',
  'Un long poème dans lequel El Sampico a mis son don pour l’écriture au service de sa plume afin d’y déverser toute l’intensité de son amour pour Carla, la femme du boss.',
  true,
);
const NoteHotel = new GameObject(
  'Note de l\'hôtel',
  'Une note de l’hôtel où il a passé la nuit avec Carla le soir du meurtre. Elle aurait été l’alibi parfait si elle ne révélait pas en même temps sa relation secrète et incriminante avec sa dulcinée.',
  true,
);
const PaquetCigarettes1 = new GameObject(
  'Paquet de cigarettes',
  'Un paquet presque vide de cigarettes italiennes sans filtre au goût amer. El Sampico ne sait pas quoi faire de ses mains tant qu’elles ne sont pas occupées à tenir une clope. ',
  false,
);
const FlasqueTequila = new GameObject(
  'Flasque de Tequila',
  'Un petit remontant pour se donner du courage.',
  false,
);
const Flingue1 = new GameObject(
  'Flingue',
  'Pour El Sampico,cette arme est une extension de sa volonté.',
  false,
);
const SouFetiche = new GameObject(
  'Sou fétiche',
  'Un peso brillant lui rappelant sa terre natale, le Mexique.',
  false,
);
const basicObjectsSampico = [PoemeAmour, NoteHotel, PaquetCigarettes1, FlasqueTequila, Flingue1,
  SouFetiche];
// Petro Francesco
const PaquetCigarettes2 = new GameObject(
  'Paquet de cigarettes',
  'Déjà à moitié vide en début de soirée,de la marque italienne Fortuna.',
  false,
);
const Briquet = new GameObject(
  'Briquet',
  'Un vieux briquet en acier noir, lourdement usé par l’utilisation quotidienne de son propriétaire.',
  false,
);
const LunettesSoleil = new GameObject(
  'Paire de lunettes de soleil de rechange',
  'Une paire de lunettes rondes et sombres',
  false,
);
const BlocNote = new GameObject(
  'Bloc-note',
  'Un bloc notes avec plein de notes griffonnées incompréhensibles, à part pour les noms de toutes les personnes de la soirée !',
  false,
);
const Menottes = new GameObject(
  'Paire de menottes',
  'Une simple paire de menottes',
  true,
);
const basicObjectsFrancesco = [PaquetCigarettes2, Briquet, LunettesSoleil, BlocNote, Menottes];
// Vito Falcaninio
const LettreParrain = new GameObject(
  'La lettre du parrain',
  'Cette lettre signée du parrain exprime ses doutes sur son entourage direct. C’est elle qui pousse Vito a réunir tout ce beau monde ce soir',
  true,
);
const Cigare = new GameObject(
  'Un cigare allumé',
  '“Jamais sans mon cubain. J’en ai besoin pour réfléchir, et réfléchir je fais que ça.”',
  false,
);
const Flingue2 = new GameObject(
  'Flingue',
  'Comme le couteau du boucher ou la plume de l’écrivain : l’outil de travail.',
  false,
);
const basicObjectsFalcaninio = [LettreParrain, Cigare, Flingue2];
// Tommaso-Giorgio
const Addition = new GameObject(
  'Addition de restaurant',
  'Ce petit bout de papier indique que Tomasso était au restaurant au moment où le parrain a été assassiné. D’après le prix et le menu, il semble qu’il y soit allé tout seul.',
  true,
);
const MontreGousset = new GameObject(
  'Montre à gousset',
  'Une jolie montre gravée qui vaut sûrement une fortune.',
  false,
);
const Chevaliere = new GameObject(
  'Une chevalière en argent',
  'Une imposante bague en argent sous la forme d’un serpent qui se mord la queue.',
  false,
);
const basicObjectsTommaso = [Addition, MontreGousset, Chevaliere];
// Carla Gurzio
const Photographie = new GameObject(
  'Photographie de El Sampico',
  'Dans le portefeuille de Carla se trouve une magnifique photographie noir et blanc du tueur à gages Mexicain. Sa moustache foisonnante rayonne de par son sourire chaleureux. La photographie semble usée par le temps mais reste malgré tout en bon état.',
  true,
);
const FlasqueParfum = new GameObject(
  'Flasque de parfum',
  'Une petite fiole de parfum à la rose de couleur vive.',
  false,
);
const Peigne = new GameObject(
  'Peigne en or',
  'Magnifique pièce en or gravé en forme de petit peigne. Semble avoir été utilisé à de nombreuse reprise.',
  false,
);
const Carnet = new GameObject(
  'Carnet',
  'Un carnet de note à la couverture en cuir de crocodile et coloré rouge vif. Il est presque vide et on peut y lire quelques date importante et rendez-vous sans grand intérêt avec des personnalités qui ne vous disent rien… On y trouve aussi quelques numéros de téléphone.',
  false,
);
const basicObjectsCarla = [Photographie, FlasqueParfum, Peigne, Carnet];
// Sebastiano Pechetto
const RapportMorgue = new GameObject(
  'Rapport de la morgue',
  'Ce rapport indique que la parrain a été empoisonné.',
  true,
);
const GantsLatex = new GameObject(
  'Une paire de gants en latex',
  'Une vieille paire de gants tachés.',
  false,
);
const Cocaine = new GameObject(
  'Cocaïne',
  'Une petit sachet transparent de 2 grammes de cocaïne. De quoi se donner un bon  coup de fouet.',
  false,
);
const basicObjectsSebastiano = [RapportMorgue, GantsLatex, Cocaine];

// Places
const Poison1 = new GameObject(
  'Fiole de poison',
  'Une fiole avec une tête de mort dessus dissimulée dans la table à chevet de Carla Gurzio. Cela ressemble à s\'y méprendre à du poison',
  true,
);
const Poison2 = new GameObject(
  'Fiole de Poison',
  'Une fiole avec une tête de mort dessus. Pas étonnant de trouver ce genre de produits dangereux dans un laboratoire',
  false,
);
const Antidote = new GameObject(
  'Antidote',
  'Un antidote, sûrement efficace contre l\'empoisonnement',
  false,
);
currentGame.addPlace('La chambre du parrain', 'La chambre du parrain et de sa femme Carla Gurzio', [Poison1]);
currentGame.addPlace('Le laboratoire du chimiste', 'Le laboratoire où travail Sebastiano Pechetto', [Poison2, Antidote, Antidote]);
currentGame.addPlace('Le vestibule', 'C\'est ici que repose le corps du parrain', []);

// Relations
// El Sampico
const relationsSampico = {
  'Petro francesco': 'Le gars a l’air solide, il à l’oeil et le corps entraînés, ça se voit.',
  'Tommaso Giorgio': 'Le fils à papa. Le gringo n’a jamais touché à un flingue de sa vie.',
  'Vito Falcaninio': 'Quand le parrain m’a engagé à l’époque, Vito m’a bien aidé à m’intégrer. Il a des principes lui aussi, c’est pas le cas de tout le monde ici.',
  'Carla Gurzio': '¡ Maravillosa ! La femme de ma vie ! La mort du parrain me permettra de lui déclarer mon amour véritable !',
  'Sebastiano Pechetto': 'La poudre du chimiste est connue au Mexique. C’est elle qui finance les cartels là-bas, pas de quoi être fier...',
};
// Petro Francesco
const relationsPetro = {
  'El Sampico': 'J’ai hâte de le coffrer celui-là, mais faut admettre qu’il sait y faire. Je dois ronger mon frein et prendre mon mal en patience, une confrontation directe pourrait très bien signer mon arrêt de mort.',
  'Tomasso Giorgio': 'Je suis pas peu fier d’avoir réussi à me faire passer pour son ami proche pendant autant de temps. Le papa avait des doutes sur moi c’est sûr. Une fois Tomasso au pouvoir, je termine d’apprendre comment tout s’articule dans cette mafia et je boucle tout le monde !',
  'Vito Falcaninio': 'L’obstacle numéro un dans mon plan. S’il prend la place du parrain, je suis cuit !',
  'Carla Gurzio': 'Elle est belle, ça on ne peut pas le nier. On a dû lui rendre bien service en refroidissant son mari. J’espère que la fiole de poison dans sa table de chevet suffira à lui faire porter le chapeau. Suffit maintenant que quelqu’un tombe dessus “par hasard”...',
  'Sebastiano Pechetto': 'Un élément crucial de toute l’organisation criminelle. Sans lui, tout fout l’camp ou presque. Il faut que j’en apprenne le plus possible sur ses fournisseurs, sans me faire cramer.',
};
// Vito Falcaninio
const relationsVito = {
  'El Sampico': 'Un pro, un vrai.',
  'Tomasso Giorgio': 'Mon poste, tout ce que j’ai, je l’ai mérité. Lui, il est né avec. Entre le bras droit fidèle et le fils à papa, le choix est vite fait : il ne reprendra jamais la place de son père tant que je respire.',
  'Petro Francesco': 'Il est bon celui-ci. Quand je serai parrain j’aurai besoin d’un type comme lui, mais il est trop proche de Tomasso et j’ai El Sampico sous le coude.',
  'Carla Gurzio': 'J’ai toujours eu le bagou pour elle. Je dois trouver un moyen de séduire la dame.',
  'Sebastiano Pechetto': 'Un atout indispensable. Je ne peux tout simplement pas être en mauvais termes avec lui si je veux gérer une mafia digne de ce nom.',
};
// Tommaso Giorgio
const relationsTommaso = {
  'Petro francesco': 'Plus qu’un complice, qu’un partenaire dans le crime, je considère Petro comme un véritable ami.',
  'El Sampico': 'Ce type ne m’inspire aucune confiance. Il ne sait que tuer, rien d’autre.',
  'Vito Falcaninio': 'Mon ennemi juré ! Il veut aussi la place de mon père, il va falloir m’imposer !',
  'Carla Gurzio': 'Ma belle mère, qui a l’âge d’être ma grande soeur !',
  'Sebastiano Pechetto': 'Le chimiste… Sans lui, il n’y aurait pas de drogue, et donc pas de mafia. Je dois m’attirer ses bonnes faveurs pour qu’on puisse travailler ensemble sans embrouille.',
};
// Carla Gurzio
const relationsCarla = {
  'Petro francesco': 'Assez indifférents face à mes charmes. Je dois rester méfiante de cet homme mystérieux… Mon mari m\'avait fait part de doutes le concernant. Il est très proche de mon idiot de beau fils et ça ne me dit rien qui vaille !',
  'Tomasso Giorgio': 'Un grand naïf celui là ! Je le manipule sans problème, mais la monté au pouvoir d’un idiot pareil signerait la fin de l’organisation… Mon mari l’avait très bien compris et l’a écarté, il est devenu assez agressif depuis. Je vais garder un oeil sur lui',
  'Vito Falcaninio': 'Il est un peu lourd… J’ai peut-être abusé avec la séduction sur celui là. Je vais essayer de prendre mes distances et de m’en débarrasser au plus vite, il ne doit en aucun cas prendre l’héritage !',
  'El Sampico': 'Quel Homme ! Ces muscles saillants ! Cette… Moustache ! Je me languis à l’idée d’entendre sa douce voix me sussurer des mots doux en espagnol encore une fois. Mon mari mort je vais maintenant pouvoir laisser éclater mon amour !',
  'Sebastiano Pechetto': 'Il me semble qu’il a un peu abusé de la drogue qu’il produit. Je dois établir de bonne relation avec lui, tout le monde le respecte et il sera un soutiens de poids pour mon plan.',
};
// Sebastiano Pechetto
const relationsSebastiano = {
  'Petro francesco': 'Toujours les yeux rivés sur moi c’est certain. Il a beau essayer de cacher son regard derrière une paire de lunettes noires mais je ne suis pas dupe !',
  'Tomasso Giorgio': 'Il cache bien son jeu derrière son air de benêt. Il est capable du pire.',
  'Vito Falcaninio': 'Un regard froid pour un homme froid. Il complote en permanence, et c’est certainement contre moi.',
  'Carla Gurzio': 'Méfiance ! C’est une véritable séductrice, elle tentera sûrement de m’entourlouper, d’une manière ou d’une autre.',
  'El Sampico': 'll me fout les j’tons ! C’est une vraie machine à tuer à ce qu’on dit.',
};


// Actions
/**
 *
 * @param {*} _
 * @param {*} place prend en argument l'objet Place qui correspond à la pièce voulant être fouillée
 */
const fouillerPiece = (game, you, result) => {
  game.getPlaceFromName(result[0][0])
    .then((place) => {
      const a = getRandomInt(2);
      let object = null;
      if (place.name == 'Le vestibule') {
        if (a == 0) {
          game.notification(you, 'info', 'En regardant le corps du parrain, vous ne trouvez aucune de strangulation ou d\'impacte de balle. Mais la drôle de couleur de son visage et la bave sortant de sa bouche vus font penser à un empoisonnement...');
        }
      } else if (place.objects.length > 0) {
        object = place.objects[Math.floor(Math.random() * place.objects.length)];
        const index = place.objects.indexOf(object);
        place.objects.splice(index, 1);
        game.notification(you, 'info', `Vous avez trouvez un objet dans ${place.role.name} : ${object.name}`);
      } else {
        game.notification(you, 'info', 'Vous n\'avez rien trouvé de particulier');
      }
      if (you.spied != null) {
        game.getPlayerFromRoleName(you.spied)
          .then((spy) => {
            if (object != null) {
              game.notification(spy, 'info', `Vous avez aperçu ${you.role.name} rammasser ${object.name} dans ${place.name}`);
            }
          });
      }
      you.role.actions.find((element) => element.name == 'Fouiller une pièce').decreaseUseNb();
    });
};
const pickpocket = (game, you, result) => {
  game.getPlayerFromRoleName(result[0][0])
    .then((player) => {
      if (player.protected == true) {
        player.setProtected(false);
      }
      const a = getRandomInt(3);
      let object = null;
      let findableObjects;
      if (a == 0 && player.getClues().length > 0) {
        findableObjects = player.getClues();
        object = findableObjects[Math.floor(Math.random() * findableObjects.length)];
        const index = player.inventory.indexOf(object);
        player.inventory.splice(index, 1);
        game.notification(you, 'info', `Vous avez trouvez un objet intéressant dans les poches de ${player.role.name} : ${object.name}`);
      } else if ((a == 1 && player.inventory.length > 0) || player.getClues().length == 0) {
        findableObjects = player.getNotClues();
        object = findableObjects[Math.floor(Math.random() * findableObjects.length)];
        const index = player.inventory.indexOf(object);
        player.inventory.splice(index, 1);
        game.notification(you, 'info', `Vous avez trouvez un objet peu interessant dans les poches de ${player.role.name} : ${object.name}`);
      } else if (a == 2) {
        game.notification(player, 'warn', `${you.role.name} a essayé de vous faire les poches`);
        game.notification(you, 'warn', `Vous avez été repérer en essayent de voler ${player.role.name}`);
      } else {
        game.notification(you, 'info', `Vous n'avez rien trouvé dans les poches de ${player.role.name}`);
      }
      if (you.spied != null) {
        game.getPlayerFromRoleName(you.spied)
          .then((spy) => {
            if (object != null) {
              game.notification(spy, 'info', `Vous avez aperçu ${you.role.name} voler ${object.name} à ${player.role.name}`);
            } else {
              game.notification(spy, 'info', `Vous avez aperçu ${you.role.name} essayer de voler ${player.role.name}, mais il ne lui a rien pris`);
            }
          });
      }
      you.role.actions.find((element) => element.name == 'Pickpocket').decreaseUseNb();
    });
};
const espionner = (game, you, result) => {
  game.getPlayerFromRoleName(result[0][0])
    .then((player) => {
      if (player.protected == true) {
        player.setProtected(false);
      } else {
        player.setSpied(you.role.name);
      }
      you.role.actions.find((element) => element.name == 'Espionner').decreaseUseNb();
    });
};
const potins = (game, you, result) => {
  const res = [game.getPlayerFromRoleName(result[0][0]), game.getPlayerFromRoleName(result[1][0])];
  if (res[1].protected == true) {
    res[1].setProtected(false);
  } else {
    game.notification(you, 'info', `Voici ce que pense ${res[0].role.name} de ${res[1].role.name}`);
    game.notification(you, 'info', res[0].role.relations.get(res[1].role.name));
    if (you.spied != null) {
      game.getPlayerFromRoleName(you.spied)
        .then((spy) => {
          game.notification(spy, 'info', `Vous avez trouvé ${you.role.name} en train de faire bavarder avec ${res[0].role.name} sur ${res[0].role.name}, et voici ce que vous entendez`);
          game.notification(spy, 'info', res[0].role.relations.get(res[1].role.name));
        });
    }
  }
  you.role.actions.find((element) => element.name == 'Potins').decreaseUseNb();
};
const refroidir = (game, you, result) => {
  game.getPlayerFromRoleName(result[0][0])
    .then((player) => {
      if (player.protected == true) {
        player.setProtected(false);
      } else {
        const a = getRandomInt(2);
        if (a == 0) {
          player.setAlive(false);
          game.notification(you, 'info', `Vous avez tué ${player.role.name}`);
          game.notification(player, 'death', `Vous avez été tué par ${you.role.name}`);
          game.players.forEach((element) => {
            if (element != you && element != player) {
              game.notification(element, 'info', `${you.role.name} a tué ${player.role.name}`);
            }
          });
        } else {
          game.notification(you, 'info', `Vous n'avez pas réussi à tuer ${player.role.name}`);
          game.players.forEach((element) => {
            if (element != you && element != player) {
              game.notification(element, 'info', `${you.role.name} a essayé de tuer ${player.role.name}, sans succès`);
            }
          });
        }
        if (you.spied != null) {
          game.getPlayerFromRoleName(you.spied)
            .then((spy) => {
              game.notification(spy, 'info', `Vous avez trouvé ${you.role.name} en train de d'essayer de tuer ${player.role.name}`);
            });
        }
        you.role.actions.find((element) => element.name == 'Refroidir').decreaseUseNb();
      }
    });
};
const empoisonner = (game, you, result) => {
  game.getPlayerFromRoleName(result[0][0])
    .then((player) => {
      if (player.protected == true) {
        player.setProtected(false);
      } else {
        player.setAlive(false);
        game.notification(you, 'info', `Vous avez empoisonné avec brio ${player.role.name}`);
        game.notification(player, 'info', 'Vous avez été empoisonné, si vous ne trouvez pas d\'antidote à temps, vous mourrez');
        if (you.spied != null) {
          game.getPlayerFromRoleName(you.spied)
            .then((spy) => {
              game.notification(spy, 'info', `Vous avez trouvé ${you.role.name} en train d'essayer d'empoisonner ${player.role.name}`);
            });
        }
      }
      you.role.actions.find((element) => element.name == 'Empoisonner').decreaseUseNb();
    });
};
const seProteger = (game, you) => {
  you.setProtected(true);
  game.notification(you, 'info', 'You are protected');
  you.role.actions.find((element) => element.name == 'Se protéger').decreaseUseNb();
};

// Send
const sendFouillerPiece = (game) => [game.choiceGenerator(
  'Choissisez une pièce que vous voulez fouiller',
  game.places,
  1,
  1,
)];
const sendPickpocket = (game, player) => {
  const rolesName = game.getRolesName();
  const choices = [];
  rolesName.forEach((element) => {
    if (element != player.role.name) {
      choices.push(element);
    }
  });
  return [game.choiceGenerator(
    'Choississez un joueur que vous voulez voler',
    choices,
    1,
    1,
  )];
};
const sendEspionner = (game, player) => {
  const rolesName = game.getRolesName();
  const choices = [];
  rolesName.forEach((element) => {
    if (element != player.role.name) {
      choices.push(element);
    }
  });
  return [game.choiceGenerator(
    'Choississez un joueur que vous voulez espionner',
    choices,
    1,
    1,
  )];
};
const sendPotins = (game, player) => {
  const rolesName = game.getRolesName();
  const choices = [];
  rolesName.forEach((element) => {
    if (element != player.role.name) {
      choices.push(element);
    }
  });
  return [
    game.choiceGenerator(
      'Choississez un joueur dont vous voulez savoir ce qu\'il pense d\'un autre',
      choices,
      1,
      1,
    ),
    game.choiceGenerator(
      'Choississez le joueur dont vous voulez qu\'il parle',
      choices,
      1,
      1,
    ),
  ];
};
const sendRefroidir = (game, player) => {
  const rolesName = game.getRolesName();
  const choices = [];
  rolesName.forEach((element) => {
    if (element != player.role.name) {
      choices.push(element);
    }
  });
  return [game.choiceGenerator(
    'Choissisez le joueur que vous voulez tuer',
    choices,
    1,
    1,
  )];
};
const sendEmpoisonner = (game, player) => {
  const rolesName = game.getRolesName();
  const choices = [];
  rolesName.forEach((element) => {
    if (element != player.role.name) {
      choices.push(element);
    }
  });
  return [game.choiceGenerator(
    'Choississez le joueur que vous voulez empoisonner',
    choices,
    1,
    1,
  )];
};

const possibleFouillePiece = (game, player) => new Promise((resolve, reject) => {
  player.role.getActionFromName('Fouiller une pièce')
    .then((action) => {
      if (action.nbUse > 0) {
        resolve(true);
      }
      resolve(false, 'Plus de points d\'action');
    })
    .catch((err) => reject(err));
});

const possiblePickpocket = (game, player) => new Promise((resolve, reject) => {
  player.role.getActionFromName('Pickpocket')
    .then((action) => {
      if (action.nbUse > 0) {
        resolve(true);
      }
      resolve(false, 'Plus de points d\'action');
    })
    .catch((err) => reject(err));
});

const possibleEspionner = (game, player) => new Promise((resolve, reject) => {
  player.role.getActionFromName('Espionner')
    .then((action) => {
      if (action.nbUse > 0) {
        resolve(true);
      }
      resolve(false, 'Plus de points d\'action');
    })
    .catch((err) => reject(err));
});

const possiblePotins = (game, player) => new Promise((resolve, reject) => {
  player.role.getActionFromName('Potins')
    .then((action) => {
      if (action.nbUse > 0) {
        resolve(true);
      }
      resolve(false, 'Plus de points d\'action');
    })
    .catch((err) => reject(err));
});

const possibleRefroidir = (game, player) => new Promise((resolve, reject) => {
  player.role.getActionFromName('Refroidir')
    .then((action) => {
      if (action.nbUse > 0) {
        resolve(true);
      }
      resolve(false, 'Plus de points d\'action');
    })
    .catch((err) => reject(err));
});

const possibleEmpoisonner = (game, player) => new Promise((resolve, reject) => {
  player.role.getActionFromName('Empoisonner')
    .then((action) => {
      if (action.nbUse > 0) {
        player.inventory.forEach((o) => {
          if (o.name == 'Poison1' || o.name == 'Poison2') {
            resolve(true);
          }
          resolve(false, 'Il faut un objet spécial');
        });
      }
      resolve(false, 'Plus de points d\'action');
    })
    .catch((err) => reject(err));
});

const possibleSeProteger = (game, player) => new Promise((resolve, reject) => {
  player.role.getActionFromName('Se protéger')
    .then((action) => {
      if (action.nbUse > 0) {
        resolve(true);
      }
      resolve(false, 'Plus de points d\'action');
    })
    .catch((err) => reject(err));
});

const actionFouillerPiece = currentGame.addAction('Fouiller une pièce', fouillerPiece, 2, sendFouillerPiece, possibleFouillePiece);
const actionPickpocket = currentGame.addAction('Pickpocket', pickpocket, 3, sendPickpocket, possiblePickpocket);
const actionEspionner = currentGame.addAction('Espionner', espionner, 1, sendEspionner, possibleEspionner);
const actionPotins = currentGame.addAction('Potins', potins, 3, sendPotins, possiblePotins);
const actionRefroidir = currentGame.addAction('Refroidir', refroidir, 1, sendRefroidir, possibleRefroidir);
const actionEmpoisonner = currentGame.addAction('Empoisonner', empoisonner, 1, sendEmpoisonner, possibleEmpoisonner);
const actionSeProteger = currentGame.addAction('Se protéger', seProteger, 1, possibleSeProteger);
// Vito
const actionsVito = [
  actionFouillerPiece,
  actionRefroidir,
  actionPickpocket,
];
// Carla
const actionsCarla = [
  actionFouillerPiece,
  actionPotins,
  actionEspionner,
];
// Petro
const actionsPetro = [
  actionEmpoisonner,
  actionPotins,
  actionFouillerPiece,
];
// Sebastiano
const actionsSebastiano = [
  actionFouillerPiece,
  actionEmpoisonner,
  actionPickpocket,
];
// Tommaso
const actionsTommaso = [
  actionFouillerPiece,
  actionSeProteger,
  actionEspionner,
];
// Sampico
const actionsSampico = [
  actionRefroidir,
  actionSeProteger,
  actionFouillerPiece,
];

// Missions
const missionVito = new Mission(
  'Objectif de Vito Falcaninio',
  'Il voit la mort du parrain comme l’opportunité qu’il attendait depuis trop longtemps. Son objectif est le même que celui de Tomasso, son plus grand rival : hériter de la fortune et du pouvoir de son défunt patron.',
);
const missionCarla = new Mission(
  'Objectif de Carla Gurzio',
  '20 ans plus jeune que son défunt mari, Carla joue bien la comédie en prétendant être dévastée et furieuse par l’événement tragique. Son réel objectif est de ressortir de cette affaire avec les poches les plus pleines possible. Son amour secret pour le fameux tueur à gage El Sampico la pousse à vouloir le placer comme nouveau parrain. Entre quête de pouvoir et amour coupable, Carla cherche à faire accuser n’importe qui du moment qu’elle et son bien aimé en sortent gagnants ! Malgré tout ça, elle n’a rien à voir dans l’assassinat de son mari et n’est au courant de rien...',
);
const missionPetro = new Mission(
  'Objectif de Petro Francesco',
  'Il est devenu un ami proche de Tomasso Giorgio au fil des années dans l’objectif de pouvoir garder un oeil sur toutes les activités de la mafia. Don Giorgio commença peu à peu à avoir des doutes sur lui, et le meurtre lui permettra de placer Tomasso Giorgio au pouvoir et de finir de démanteler tout le réseau grâce à toutes les nouvelles informations qu’il pourra obtenir avec la confiance que le nouveau chef aura en lui… C’est lui qui, en suivant le plan machiavélique de Tomasso, a empoisonné la soupe du parrain en utilisant une des drogues volée dans le laboratoire la veille. Il a caché le flacon restant dans le tiroir de la table de chevet de Carla pour la faire accuser. L’argent n’a que peu d\'intérêt à ses yeux, seul le bon déroulement du plan compte et pour cela Tomasso doit devenir le nouveau chef et (bien évidemment) ne pas se faire découvrir.',
);
const missionSebastiano = new Mission(
  'Objectif de Sebastiano Pechetto',
  'Sauver sa peau ! Il n’a pas tué le parrain, mais il sait que c’est l’un des produits de son laboratoire qui a servi à l’empoisonner. Il ne sait pas qui a pu lui subtiliser cet ingrédient.',
);
const missionTommaso = new Mission(
  'Objectif de Tommaso Giorgio',
  'L’objectif de Tommaso est simple : prendre la place de son défunt père. L’héritage se faisait trop attendre, Tomasso a préféré accélérer les choses en demandant à son acolyte Petro Francesco de tuer son père et de cacher l’arme du crime.',
);
const missionSampico = new Mission(
  'Objectif de El Sampico',
  'La mort du parrain s’annonce pour El Sampico comme une double opportunité : la place du boss est libre et sa femme est enfin seule ! Éperdument amoureux de Carla Gurzio, il va lui déclarer sa flamme pendant la soirée à l’aide d’un poème. Il ne sait pas si Carla est impliqué dans la mort de son mari, mais la protège à tout prix si elle vient à être l’objet de suspicions. Sachant que sa relation avec la veuve pourrait le rendre suspect du crime, il saura rester discret.',
);

// Create roles in the game
currentGame.addRole(
  'Vito Falcaninio',
  'le bras droit',
  missionVito,
  basicObjectsFalcaninio,
  relationsVito,
  actionsVito,
);
currentGame.addRole(
  'Carla Gurzio',
  'la femme du parrain',
  missionCarla,
  basicObjectsCarla,
  relationsCarla,
  actionsCarla,
);
currentGame.addRole(
  'Petro Francesco',
  'l\'infiltré de la police locale',
  missionPetro,
  basicObjectsFrancesco,
  relationsPetro,
  actionsPetro,
);
currentGame.addRole(
  'Sebastiano Pechetto',
  'dit le “Chimiste”, responsable des labos de synthèse de drogue',
  missionSebastiano,
  basicObjectsSebastiano,
  relationsSebastiano,
  actionsSebastiano,
);
currentGame.addRole(
  'Tommaso-Giorgio',
  'fils du parrain',
  missionTommaso,
  basicObjectsTommaso,
  relationsTommaso,
  actionsTommaso,
);
currentGame.addRole(
  'El Sampico',
  'le meilleur tueur à gage',
  missionSampico,
  basicObjectsSampico,
  relationsSampico,
  actionsSampico,
);

export default currentGame;
