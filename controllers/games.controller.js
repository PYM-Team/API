/* eslint-disable eqeqeq */
import Game from '../models/games.model';

export function helloWorld(ctx, next) {
  // eslint-disable-next-line no-console
  console.log('Hello world');
}

export function getGame(ctx, next) {
  console.log(ctx.params);
  if (ctx.params.gameid) {
    Game.find({ id: ctx.params.gameid })
      .then((games, err) => {
        ctx.body = games;
      })
      .catch((err) => {
        ctx.status = 400;
        ctx.body = err;
      });
  } else {
    ctx.status = 400;
  }
}

function findGameId(gameid, callback) {
  let gid = gameid;
  Game.find({ id: gid }, (_err, games) => {
    if (games.length != 0) {
      gid += 1;
      return findGameId(gid, callback);
    }
    callback(gid);
  });
}

export function createGame(ctx, next) {
  // generating the random id;
  findGameId(1, (gameid) => {
    Game({ id: gameid }).save();
    ctx.body = {
      status: 'success',
      message: 'Game created',
      id: gameid,
    };
  });
}
