/* eslint-disable no-console */
/* eslint-disable func-names */
const Game = require('../models/games.model');

exports.helloWorld = function (ctx, next) {
  console.log('Hello world');
};

exports.createGame = function (ctx, next) {
  const game = new Game({});
  game.save();

  ctx.body = {
    status: 'success',
    message: 'Game created',
  };
};
