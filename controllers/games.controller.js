/* eslint-disable no-console */
/* eslint-disable func-names */
import Game from '../models/games.model';

export function helloWorld(ctx, next) {
  console.log('Hello world');
}

export function createGame(ctx, next) {
  const game = new Game({});
  game.save();

  ctx.body = {
    status: 'success',
    message: 'Game created',
  };
}
