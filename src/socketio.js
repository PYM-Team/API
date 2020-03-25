/* eslint-disable no-console */
import Player from './models/players.model';
import Game from './models/games.model';

// Live storage for non-essential data keys are gameid
const storedGames = {};

// Populate the storedGames with already in database games and players
Game.find()
  .then((games) => {
    games.forEach((game) => {
      Player.find({ gameId: game.id })
        .then((players) => {
          storedGames[game.id] = {
            players: {}, // Players are identified by their username inside
          };

          players.forEach((player) => {
            storedGames[game.id].players[player.name] = { connected: false };
          });

          console.log(storedGames);
        });
    });
  })
  .catch((err) => { console.log(err); });

const initSocketIO = (server) => {
  // eslint-disable-next-line global-require
  const Sio = require('socket.io');
  const io = new Sio(server);
  io.set('origins', '*:*');

  io.on('connection', (socket) => {
    let gameId = 0;
    let playerUsername;
    let isGameMaster = false;

    console.log('Connection established with client : ', socket.id);

    socket.on('createGame', (roomId) => {
      console.log('Client is a game Master, requesting game creation');
      gameId = roomId;
      isGameMaster = true;

      Game.find({ id: roomId })
        .then((games) => {
          if (games.length === 0) {
            console.log('Game id is free, creation allowed');
            Game({ id: roomId }).save(); // adding it to the db
            storedGames[roomId] = {
              players: {}, // Players are identified by their username inside
            }; // adding it to the live memory

            console.log(storedGames);

            socket.join(gameId);
            console.log(`Game Master ${socket.id} joined socket.io room ${roomId}`);
          } else {
            console.log('Game id is already used, just connecting the Game Master to it');
            socket.join(gameId);
            console.log(`Game Master ${socket.id} joined socket.io room ${roomId}`);
          }
        })
        .catch((err) => { console.log(err); });
    });

    socket.on('connectGame', (roomId, username) => {
      // dynamically store connection information in the server
      gameId = roomId;
      playerUsername = username;

      // test if the game exist
      // eslint-disable-next-line no-prototype-builtins
      if (storedGames.hasOwnProperty(roomId)) {
        // Add the player to the right socket.io group
        socket.join(`${gameId}player`);
        console.log(`Client is a player. Now connected to roomId ${roomId}`);

        // Check if the player does not already exist in the database
        Player.find({ gameId: roomId, name: username })
          .then((player) => {
            // If not
            if (player.length === 0) {
              console.log(`Player not in database. Adding it with game id ${roomId}`);

              // Add it to db and live memory
              storedGames[roomId].players[username] = { connected: true };
              Player({ gameId: roomId, name: playerUsername }).save()
                .then(() => {
                  // Then we get every players from the game and send it to the game master
                  io.to(gameId).emit('playerConnected', storedGames[roomId].players);
                  console.log('players list :', storedGames[roomId].players);
                });
            } else {
              console.log(`The player ${username} just reconnected, he already is in database`);

              //! not tested
              storedGames[roomId].players[username].connected = true;

              io.to(gameId).emit('playerConnected', storedGames[roomId].players);
              console.log('players list :', storedGames[roomId].players);
            }
          })
          .catch((err) => { console.log(err); });
      } else {
        // if the game id does not exist
        io.to(`${gameId}player`).emit('error', 'Game id is not correct');
        console.log('incorrect gameId provided by the player');
      }
    });

    //* need use gameId and playerUsername because roomId and username aren't in the scope
    // TODO: test if there is a possibility for not existing game

    socket.on('disconnect', (reason) => {
      // handle 2 different cases : player or gameMaster
      if (!isGameMaster) {
        try {
          storedGames[gameId].players[playerUsername].connected = false;
          io.to(gameId).emit('playerDisconnected', storedGames[gameId].players);
          console.log('players list : ', storedGames[gameId].players);
        } catch (error) {
          console.log(error);
        }
      } else {
        // TODO
      }
    });
  });
};

export default initSocketIO;
