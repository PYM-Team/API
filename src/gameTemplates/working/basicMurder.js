import GameTemplate from '../gameTemplate';

const currentGame = new GameTemplate('basicMurder');

// Murderer mission
const kill = (_, others) => {
  others[0].setAlive(false);
  others[0].announce('You have been killed');
};

const killAction = currentGame.addAction('Tuer', kill, 1, (game, you) => {
  const others = [];
  game.players.forEach((p) => {
    if (p != you) {
      others.push(p.name);
    }
  });
  return [game.choiceGenerator('Selectionne quelqu\'un que tu veux tuer', others, 1, 1)];
});

currentGame.addMission(
  'Tuer tout le monde',
  killAction,
  null,
  'Vous devez vous débarrasser le plus vite possible de tout les autres joueurs de la partie.',
);

// Detectives mission
const find = (_, others) => {
  others[0].getRole();
};

const findAction = currentGame.addAction('Inspecter', find, 1, (game, you) => {
  const others = [];
  game.players.forEach((p) => {
    if (p != you) {
      others.push(p.name);
    }
  });
  return [game.choiceGenerator('Selectionne quelqu\'un que tu veux démasquer', others, 1, 1)];
});

currentGame.addMission(
  'Trouver le meurtrier en testant les autres joueurs',
  findAction,
  null,
);

// Create roles in the game
currentGame.addRole('Meurtrier', 'Vous etes un très méchant meurtrier', null, null, null, [killAction], 3);

for (let i = 0; i < 3; i += 1) {
  currentGame.addRole('Detective', 'Vous êtes un gentil détective', null, null, null, [findAction], 2);
}

export default currentGame;
