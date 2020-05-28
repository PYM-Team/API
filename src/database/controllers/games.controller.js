/* eslint-disable eqeqeq */
import Game from '../models/games.model';

export function helloWorld() {
  // eslint-disable-next-line no-console
  console.log('Hello world');
}

export function getGame(gameToGet) {
  return new Promise((resolve) => {
    Game.find({ game: gameToGet })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        resolve(err);
      });
  });
}

export function gameIdExist(aGameId) {
  return new Promise((resolve) => {
    Game.exists({ gameId: aGameId })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        resolve(err);
      });
  });
}

export function createGame(gameToCreate, aGameId) {
  // generating the random id;
  return new Promise((resolve) => {
    Game({ game: gameToCreate, gameId: aGameId }).save()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        resolve(err);
      });
  });
}

export function deleteGame(aGameId) {
  return new Promise((resolve) => {
    Game.deleteOne({ gameId: aGameId })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        resolve(err);
      });
  });
}
