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

function findGameId(callback) {
  let gid = Math.round(Math.random() * 899999) + 100000;
  // eslint-disable-next-line consistent-return
  Game.find({ id: gid }, (_err, games) => {
    if (games.length != 0) {
      gid = Math.round(Math.random() * 899999) + 100000;
      return findGameId(gid, callback);
    }
    callback(gid);
  });
}

export function createGame(ctx, next) {
  // generating the random id;
  return new Promise(((resolve) => {
    findGameId((gameid) => {
      Game({ id: gameid }).save()
        .then(() => {
          console.log(`saved to db with id ${gameid}`);
          ctx.body = {
            status: 'success',
            message: 'Game created',
            id: gameid,
          };
          resolve();
        });
    });
  }));
}
