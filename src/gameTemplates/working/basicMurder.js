import GameTemplate from '../gameTemplate';

const currentGame = new GameTemplate('basicMurder');

// Murderer mission
/**
 * The kill action effect
 * @param {GameTemplate} game the game
 * @param {Player} you the player
 * @param {Array} result the choice results from the app
 */
const kill = (game, you, result) => {
  game.getPlayerFromName(result[0][0])
    .then((player) => {
      player.setAlive(false);
      game.notification(player, 'death', 'You have been murdered !');
      game.notification(you, 'info', `You killed ${player.name} and he was ${player.role.name}`);
    })
    .catch((err) => {
      game.sendOKToPlayer(you.socket, 'actionResult', err.message);
    });
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

/**
 * Find action effect
 * @param {GameTemplate} game The game
 * @param {Player} you the player
 * @param {Array} result The result from the app
 */
const find = (game, you, result) => {
  game.getPlayerFromName(result[0][0])
    .then((player) => {
      game.notification(you, 'info', `The player ${player.name} is the ${player.role.name}`);
    })
    .catch((err) => {
      game.sendErrorToPlayer(you, 'actionResult', err.message);
    });
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
