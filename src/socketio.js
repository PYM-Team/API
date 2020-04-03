/* eslint-disable no-console */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-underscore-dangle */
import importModules from 'import-modules';

let io = null;

export const initSocketIO = (server) => {
  const games = {};
  const gamesTemplates = importModules('gameTemplates');
  console.log(gamesTemplates);
  // eslint-disable-next-line global-require
  const Sio = require('socket.io');
  io = new Sio(server);

  io.on('connection', (socket) => {
    console.log(`socket ${socket.id} connected`);

    // ************************* Initialisation Functions **********************
    socket.on('newGame', (content) => {
      console.log('New Game ask to be created');
      if (!games.hasOwnProperty(content.gameId)) {
        // !Attention est-ce que ca copie l'objet ????
        games[content.gameId] = gamesTemplates[content.templateName].default;
        games[content.gameId].addGameMaster(socket.id);
        socket.join(content.gameId);
        socket.emit('created');
        console.log(games);
      } else {
        // TODO
      }
    });

    socket.on('connectGame', (content) => {
      if (games.hasOwnProperty(content.gameId)) {
        console.log('Adding player to the game room');
        socket.join(content.gameId);
        // TODO: add a real player
        games[content.gameId].addPlayer(content.name, socket.id, content.gameId);
        socket.emit('connected');
      } else {
        // TODO
      }
    });

    socket.on('request', (content) => {
      if (games.hasOwnProperty(content.gameId)) {
        if (games[content.gameId].getGameMaster() === socket.id) {
          games[content.gameId].getRequest(content);
        }
      }
    });
  });
};

// ************************* Template functions **********************

export const sendMessageToSocket = (socketId, message) => {
  if (io != null) {
    io.to(socketId).emit('realTimeUpdate', message);
  }
};

export const sendMessageToPlayers = (gameId, message) => {
  if (io != null) {
    io.to(`${gameId}player`).emit('realTimeUpdate', message);
  }
};

export const sendMessageToGameMaster = (gameId, message) => {
  if (io != null) {
    io.to(gameId).emit('realTimeUpdate', message);
  }
};
