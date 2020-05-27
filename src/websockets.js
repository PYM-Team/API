/* eslint-disable max-len */
/* eslint-disable no-prototype-builtins */
/* eslint-disable import/prefer-default-export */
import importModules from 'import-modules';
import Joi from '@hapi/joi';
import jwt from 'jsonwebtoken';
import lodash from 'lodash';

const schema = Joi.object({
  type: Joi.string().alphanum().required(),
  status: Joi.string().alphanum().required(), // TODO allow only ok and error
  data: Joi.object().required(),
}).unknown();

const games = {};
let gameTemplates = {};

const imageTest = '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';

export const initWS = () => {
  // Importing the game Templates available in the given folder
  gameTemplates = importModules('gameTemplates/working');
};

function sendError(websocket, type, message) {
  const content = {
    type,
    status: 'error',
    token: null,
    data: {
      message,
    },
  };
  websocket.send(JSON.stringify(content));
}

/**
 * Test the id sent by the player to know if a game exist with this id. Return the user a boolean
 * @param {Websocket} websocket The user websocket
 * @param {Object} received The content parsed from the request
 */
function testId(websocket, data) {
  if (Object.keys(games).includes(data.id.toString())) {
    const content = {
      type: 'testId',
      status: 'ok',
      token: null,
      data: {},
    };
    websocket.send(JSON.stringify(content));
  } else {
    sendError(websocket, 'testId', 'The gameid is not active yet');
  }
}

/**
 * Create a game and return the Id to the GM.
 * @param {Websocket} websocket The user websocket
 * @param {Object} data The data parsed from the request
 */
function createGame(websocket, data) {
  const dataSchema = Joi.object({
    templateName: Joi.string().alphanum().required(),
    duration: Joi.alternatives(
      Joi.string().alphanum(),
      Joi.number().integer(),
    ).required(),
  });

  const validData = dataSchema.validate(data);
  if (validData.error != null) {
    sendError(websocket, 'createGame', 'Data sent is not valid');
    return;
  }
  // finding a non-existant game id
  let newId = 0;
  do {
    newId = Math.floor((Math.random() * 899999) + 100000);
  } while (games.hasOwnProperty(newId));

  if (!Object.keys(gameTemplates).includes(data.templateName)) {
    sendError(websocket, 'createGame', 'Any template found with given name');
    return;
  }
  jwt.sign({
    entity: 'gameMaster',
    gameId: newId,
  }, 'secret', (error, token) => {
    if (error != null) {
      sendError(websocket, 'createGame', 'Could not generate the token');
      return;
    }
    games[newId] = lodash.cloneDeep(gameTemplates[data.templateName].default);
    games[newId].setDuration(validData.value.duration);
    // games[newId] = gameTemplates[data.templateName].default;
    games[newId].addGameMaster(websocket);
    const content = {
      type: 'createGame',
      status: 'ok',
      token: null,
      data: {
        gameId: newId,
        token,
      },
    };
    websocket.send(JSON.stringify(content));
  });
}

function gmReconnectGame(websocket, data) {
  const dataSchema = Joi.object({
    gameId: Joi.alternatives(
      Joi.string().alphanum(),
      Joi.number().integer().min(100000).max(999999),
    ),
    playerName: Joi.string().alphanum(),
  });

  const validData = dataSchema.validate(data);
  if (validData.error != null) {
    sendError(websocket, 'gmReconnectGame', 'Data sent is not valid');
    return;
  }
  if (Object.keys(games).includes(validData.value.gameId.toString())) {
    let error = true;
    games[validData.value.gameId].players.forEach((player) => {
      if (player.name == validData.value.playerName) {
        error = false;
        jwt.sign({
          entity: 'gameMaster',
          gameId: validData.value.gameId,
        }, 'secret', (err, token) => {
          if (err != null) {
            sendError(websocket, 'gmReconnectGame', 'Could not generate the token');
            return;
          }
          games[validData.value.gameId].addGameMaster(websocket);
          const status = games[validData.value.gameId].getStatus();
          const content = {
            type: 'gmReconnectGame',
            status: 'ok',
            token: null,
            data: {
              token,
              status,
            },
          };
          websocket.send(JSON.stringify(content));
        });
      }
    });
    if (error) {
      sendError(websocket, 'gmReconnectGame', 'No player with this name in the game');
    }
  } else {
    sendError(websocket, 'gmReconnectGame', 'The gameId provided is incorrect');
  }
}

function connectGame(websocket, data) {
  // if game still exist
  const dataSchema = Joi.object({
    gameId: Joi.alternatives(
      Joi.string().alphanum(),
      Joi.number().integer().min(100000).max(999999),
    ),
    username: Joi.string().alphanum(),
    password: Joi.string().alphanum(),
  });
  const validData = dataSchema.validate(data);
  if (validData.error != null) {
    sendError('Data sent is not valid');
    return;
  }
  if (Object.keys(games).includes(validData.value.gameId.toString())) {
    jwt.sign({
      entity: 'player',
      gameId: validData.value.gameId,
      user: validData.value.username,
      pass: validData.value.password,
    }, 'secret', (error, token) => {
      if (error != null) {
        sendError(websocket, 'connectGame', 'Error while generating the JWT');
        return;
      }
      games[validData.value.gameId].addPlayer(validData.value.username, validData.value.password, websocket);
      const rolesToSend = [];
      Object.keys(games[validData.value.gameId].roles).forEach((roleName) => {
        const r = {
          name: roleName,
          image: imageTest,
        };
        rolesToSend.push(r);
      });
      const content = {
        type: 'connectGame',
        status: 'ok',
        token: null,
        data: {
          token,
          roles: rolesToSend,
        },
      };
      websocket.send(JSON.stringify(content));
    });
  } else {
    const content = {
      type: 'connectGame',
      status: 'error',
      data: {
        message: 'The game id provided is incorrect',
      },
    };
    websocket.send(JSON.stringify(content));
  }
}

function getTemplatesPage(websocket) {
  const templatesToSend = [
    { name: 'LeParrain', summary: "Don Giorgio, baron de la drogue et parrain de la pègre locale, a rendu l'âme. A qui profite le crime ?", description: 'Cette enquête se déroule dans les années 30, en plein coeur de la mafia italienne. Le parrain Don Giorgio a été assassiné. Qui a pu commettre une telle atrocité ? Qui va hériter de son empire et de sa fortune ? Toutes ces questions trouveront leur réponse ce soir.' },
    { name: 'Intrigues à la cour du roi', summary: 'GameOfTrones mais en mieux !', description: 'A VENIR' },
    { name: 'En pleine guerre froide', summary: 'Devenez un espion américain perdu en terre communiste', description: 'A VENIR' },
    { name: 'Bagarre de saloon', summary: 'Des flingues et des tequillas. Une bonne soirée vous attends', description: 'A VENIR' },
    { name: 'Mariage compromis', summary: "Votre vie n'est pas assez triste ? Testez alors ce scénario plein de trahisons et de drama", description: 'A VENIR' },
    { name: 'Panique à la discothèque', summary: 'Enquêtes et affros. Thriller passionant dans une boite de nuit disco des années 80', description: 'A VENIR' },
  ];
  // const templatesToSend = [];
  // Object.values(gameTemplates).forEach((t) => {
  //   const template = t.default;
  //   templatesToSend.push({
  //     name: template.name,
  //     summary: template.summary,
  //     description: template.description,
  //   });
  // });

  const content = {
    type: 'getTemplatesPage',
    status: 'ok',
    token: null,
    data: {
      templates: templatesToSend,
    },
  };
  websocket.send(JSON.stringify(content));
}

function ping(websocket) {
  const content = {
    type: 'pong',
    status: 'ok',
    token: null,
    data: {},
  };
  websocket.send(JSON.stringify(content));
}

export const websockified = (ctx) => {
  ctx.websocket.on('message', (event) => {
    const received = JSON.parse(event); // TODO if not json

    const valid = schema.validate(received);
    if (valid.error != undefined) {
      const content = {
        type: received.type,
        status: 'error',
        data: {
          message: 'The request does not fit the requirings',
        },
      };
      ctx.websocket.send(JSON.stringify(content));
      return;
    }

    switch (valid.value.type) {
      case 'ping':
        ping(ctx.websocket);
        break;
      case 'testId':
        testId(ctx.websocket, valid.value.data);
        break;
      case 'createGame':
        createGame(ctx.websocket, valid.value.data);
        break;
      case 'gmReconnectGame':
        gmReconnectGame(ctx.websocket, valid.value.data);
        break;
      case 'connectGame':
        connectGame(ctx.websocket, valid.value.data);
        break;
      case 'getTemplatesPage':
        getTemplatesPage(ctx.websocket, valid.value.data);
        break;
      default:
        if (valid.value.token == null) {
          sendError(ctx.websocket, valid.value.type, 'You need to specify a token !');
          return;
        }
        jwt.verify(valid.value.token, 'secret', (error, payload) => {
          if (error != null) {
            sendError(ctx.websocket, valid.value.type, 'Could not verify the token');
            return;
          }
          switch (payload.entity) {
            case 'player':
              games[payload.gameId].handlePlayerUpdate(ctx.websocket, valid.value, payload);
              break;
            case 'gameMaster':
              games[payload.gameId].handleGmUpdate(ctx.websocket, valid.value);
              break;
            default:
              sendError(ctx.websocket, valid.value.type, 'This type does not exist');
              break;
          }
        });
        break;
    }
  });
};

export const sendMessageToSocket = (websocket, content) => {
  try {
    websocket.send(JSON.stringify(content));
  } catch {
    return new Error('cannot send');
  }
  return null;
};

export const sendMessageToPlayers = (gameId, content) => {
  try {
    this.games[gameId].getPlayers().forEach((p) => {
      p.websocket.send(JSON.stringify(content));
    });
  } catch {
    return new Error('cannot send');
  }
  return null;
};
