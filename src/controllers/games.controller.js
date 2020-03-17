/* eslint-disable eqeqeq */
import Game from '../models/games.model';
import Player from '../models/players.model';

export function helloWorld(ctx, next) {
  // eslint-disable-next-line no-console
  console.log('Hello world');
}

export function getGame(ctx, next) {
  return new Promise((resolve) => {
    Game.find({ id: ctx.params.id })
      .then((games, err) => {
        console.log(games);
        ctx.body = games;
        resolve();
      })
      .catch((err) => {
        ctx.status = 400;
        ctx.body = err;
        resolve();
      });
  });
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
  return new Promise((resolve) => {
    findGameId((gameid) => {
      Game({ id: gameid, usernames: [] }).save()
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
  });
}

export function modifyGame(ctx, next) {
  return new Promise((resolve) => {
    Game.findOneAndUpdate({ id: ctx.params.id }, { usernames: ctx.params.newUsernames })
      .then((err) => {
        ctx.body = {
          status: 'success',
          message: 'Game updated',
          newUsernames: ctx.params.newUsernames,
        };
        resolve();
      })
      .catch((err) => {
        ctx.status = 400;
        ctx.body = err;
        resolve();
      });
  });
}

export function deleteGame(ctx, next) {
  return new Promise((resolve) => {
    Game.deleteOne({ id: ctx.params.id })
      .then((err) => {
        ctx.body = {
          status: 'success',
          message: 'Game deleted',
          id: ctx.params.id,
        };
        resolve();
      })
      .catch((err) => {
        ctx.status = 400;
        ctx.body = err;
        resolve();
      });
  });
}

export function getPlayers(ctx, next) {
  return new Promise((resolve) => {
    Player.find({ gameId: ctx.params.gameId })
      .then((players, err) => {
        console.log(players);
        ctx.body = players;
        resolve();
      })
      .catch((err) => {
        ctx.status = 400;
        ctx.body = err;
        resolve();
      });
  });
}

export function createPlayer(ctx, next) {
  return new Promise((resolve) => {
    Player({ gameId: ctx.params.gameId, name: ctx.request.body.name }).save()
      .then(() => {
        console.log(`saved to db with Game ${ctx.params.gameId}`);
        ctx.body = {
          status: 'success',
          message: 'Player created',
          game: ctx.params.gameId,
          name: ctx.request.body.name,
        };
        resolve();
      })
      .catch((err) => {
        ctx.status = 400;
        ctx.body = err;
        resolve();
      });
  });
}

export function deletePlayers(ctx, next) {
  return new Promise((resolve) => {
    Player.deleteMany({ gameId: ctx.params.gameId })
      .then((err) => {
        ctx.body = {
          status: 'success',
          message: 'Players deleted',
          gameId: ctx.params.gameId,
        };
        resolve();
      })
      .catch((err) => {
        ctx.status = 400;
        ctx.body = err;
        resolve();
      });
  });
}
