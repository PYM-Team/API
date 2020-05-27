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

export function createGame(gameToCreate) {
  // generating the random id;
  return new Promise((resolve) => {
    Game({ game: gameToCreate }).save()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        resolve(err);
      });
  });
}

export function deleteGame(gameToDelete) {
  return new Promise((resolve) => {
    Game.deleteOne({ game: gameToDelete })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        resolve(err);
      });
  });
}
