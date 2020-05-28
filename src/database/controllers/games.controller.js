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

export function getAllGames() {
  return new Promise((resolve, reject) => {
    const games = [];
    Game.find({}, (err, game) => {
      games[game.gameId] = game;
    })
      .then(() => {
        resolve(games);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function gameIdExist(aGameId) {
  return new Promise((resolve, reject) => {
    Game.exists({ gameId: aGameId })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function createGame(gameToCreate, aGameId) {
  // generating the random id;
  return new Promise((resolve, reject) => {
    Game({ game: gameToCreate, gameId: aGameId }).save()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function deleteGame(aGameId) {
  return new Promise((resolve, reject) => {
    Game.deleteOne({ gameId: aGameId })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}
