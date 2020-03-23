/* eslint-disable no-console */
import bodyparser from 'koa-bodyparser';
import Koa from 'koa';
import Player from './models/players.model';
import Game from './models/games.model';
import initDB from './database';
import gameRouter from './routes/games.route';


const app = new Koa();
const server = require('http').createServer(app.callback());
const cors = require('@koa/cors');

const sio = require('socket.io');
// eslint-disable-next-line new-cap
const io = new sio(server);

initDB();


app.use(cors());
const PORT = process.env.PORT || 1337;

app.use(bodyparser());
app.use(gameRouter.routes());

app.context.io = io;

io.on('connection', (socket) => {
  let gameId = 0;
  let playerUsername;

  console.log('Connection established with client : ', socket.id);

  socket.on('createGame', (roomId) => {
    gameId = roomId;
    Game.find({ id: roomId })
      .then((games) => {
        if (games.length == 0) {
          console.log("OK on peut créer une game");
          Game({ id: roomId, usernames: [] }).save();
          socket.join(gameId);
          console.log(`Create real time for the room ${roomId}`);
        } else {
          socket.join(gameId);
          console.log(`Create real time for the room ${roomId}`);
        }
      })
      .catch((err) => { console.log(err) });

  });

  socket.on('connectGame', (roomId, username) => {

    // dynamically store connection information in the server
    gameId = roomId;
    playerUsername = username;

    // Add the player to the right socket.io group
    socket.join(`${gameId}player`);
    console.log('player connected to roomId');

    // TODO: Check if the gameid exist !
    // Check if the player does not already exist in the database
    Player.find({ gameId: roomId, name: username })
      .then((player) => {
        // If not
        console.log('inside the if');
        if (player.length == 0) {
          console.log(`add a new player to the database with game id ${roomId}`);
          // Add it
          Player({ gameId: roomId, name: playerUsername }).save()
            .then(() => {
              //Then we get every players from the game and push the new player inside
              Player.find({ gameId: roomId })
                .then((players) => {
                  console.log(players);
                  io.to(gameId).emit('playerConnected', players);
                  Game.findOneAndUpdate({ id: roomId }, { $push: { usernames: username } }); // !not working as expected
                })
                .catch((err) => { console.log(err) });
            });
        } else {
          console.log(`The player ${username} just reconnected, he already is in database`);
          console.log(player);
          Player.find({ gameId: roomId })
            .then((players) => {
              io.to(gameId).emit('playerConnected', players);
              Game.findOneAndUpdate({ id: roomId }, { $push: { usernames: username } }); // !not working as expected
            })
            .catch((err) => { console.log(err) });
        }
      })
      .catch((err) => { console.log(err) });
  })

  socket.on('disconnect', (reason) => {
    io.to(gameId).emit('playerDisconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

export default app;
