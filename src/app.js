/* eslint-disable no-console */
import bodyparser from 'koa-bodyparser';
import Koa from 'koa';
import Player from './models/players.model';
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

  console.log('Connection established with client : ', socket.id);

  socket.on('createGame', (roomId) => {
    gameId = roomId;
    socket.join(gameId);
    console.log(`Create real time for the room ${roomId}`);
  });

  socket.on('connectGame', (roomId) => {
    gameId = roomId;
    socket.join(`${gameId}player`);
    console.log('player connected to roomId');
    Player({ gameId: roomId, name: 'toto' }).save()
      .then(() => {
        Player.find({ gameId : roomId })
          .then((players, err) => {
            console.log(players);
            io.to(gameId).emit('playerConnected', players);
          });
      })
      .catch((err) => {
      });
  });

  socket.on('disconnect', (reason) => {
    io.to(gameId).emit('playerDisconnected');
  });
});


server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

export default app;
