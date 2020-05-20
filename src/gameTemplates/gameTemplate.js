/* eslint-disable class-methods-use-this */

import { Role } from '../gameElements/role';
import { Player } from '../gameElements/player';
import { Mission } from '../gameElements/modules/mission';
import { Action } from '../gameElements/action';
import { Place } from '../gameElements/place';


import { sendMessageToSocket } from '../websockets';

class GameTemplate {
  constructor(name) {
    this.name = name || null;
    this.summary = null;
    this.description = null;
    this.gameId = null;
    this.started = false;
    this.actions = [];
    this.roles = {};
    this.places = [];
    this.players = [];
    this.missions = []; // mission is still there in legacy purpose
    this.gameMasterSocket = null;
    this.functions = {
      /**
      * Change game started property to true
      */
      startGame: () => {
        if (this.started) {
          // TODO
        } else if (this.howManyRoles() !== this.howManyPlayers()) {
          // TODO
        } else {
          this.assignRoles();
          this.started = true;
          this.players.forEach((player) => {
            const content = {
              role: player.role,
              name: player.name,
              alive: player.alive,
            };
            sendMessageToSocket(player.socket, content);
          });
        }
      },

      /**
       * Change game started property to false
       */
      stopGame: () => {
        if (this.started) {
          // TODO: send update to players
          this.started = false;
        } else {
          // TODO
        }
      },
    };
  }

  // ############################## GETTERS #######################################

  getPlayers() {
    return this.players;
  }

  getRolesName() {
    return Object.keys(this.roles);
  }

  getPlayersName() {
    let playersName;
    this.players.forEach((player) => {
      playersName.push(player.name);
    });
    return playersName;
  }

  getPlayerFromName(name) {
    return new Promise((resolve, reject) => {
      this.players.forEach((player) => {
        if (player.name == name) {
          resolve(player);
        }
      });
      reject(new Error('No player matching this name'));
    });
  }

  getRoleFromName(name) {
    return new Promise((resolve, reject) => {
      if (Object.keys(this.roles).includes(name)) {
        resolve(this.roles[name]);
      } else {
        reject(new Error('No role matching this name'));
      }
    });
  }

  /**
   * Get the GM socket
   */
  getGameMaster() {
    return this.gameMasterSocket;
  }

  /**
   * Return how many players are in the game
   */
  howManyPlayers() {
    return this.players.length;
  }

  /**
   * Return how many roles are set
   */
  howManyRoles() {
    return this.roles.length;
  }

  // ############################## SETTERS #######################################

  /**
   * set the game's id
   * @param {Number} gameId the game's id
   */
  setGameId(gameId) {
    this.gameId = gameId;
  }

  /**
   * Set player's role from a player
   * @param {Object} tokenPayload the decoded token
   * @param {String} roleName The roleName to set
   * @param {Function} callback callback error
   */
  setPlayerRolePref(player, roleName, callback) {
    if (Object.keys(this.roles).includes(roleName)) {
      player.setRole(this.roles[roleName]); // TODO chang this
      player.setRolePref(roleName);
      callback(null);
      return;
    }
    callback('No role matching role name');
  }

  // ################################# ADDERS #####################################

  /**
   * Add the gameMaster socket to the game
   * @param {Websocket} socket The gameMaster's socket
   */
  addGameMaster(socket) {
    this.gameMasterSocket = socket;
  }

  /**
   * Create a new player and add it to players list
   * @param {String} name The player's name
   * @param {Websocket} socket The player's socket
   * @return error
   */
  // addPlayer(name, pass, socket, roleName, callback) {
  //   if (Object.keys(this.roles).includes(roleName)) {
  //     const p = new Player(name, pass, socket, this.roles[roleName]);
  //     this.players.push(p);
  //     callback(null);
  //   }
  //   callback(new Error('No role matching role name'));
  // }
  addPlayer(name, pass, socket) {
    const p = new Player(name, pass, socket);
    this.players.push(p);
  }

  /**
   * addRole is used to create a new Role to have in the current game template
   * @param {String} name Role name
   * @param {String} desc Role description
   * @param {Mission} mission Role mission
   * @param {Array} basicObjects Basic objects of the role
   * @param {Map} relations The relations between this role and the others
   */
  addRole(name, desc, mission, basicObjects, relations) {
    this.roles[name] = new Role(name, desc, mission, basicObjects, relations);
    return this.roles[name];
  }

  /**
   * addMission store a new mission in the current Game object
   * @param {String} name The mission's name
   * @param {Action} action The action which can be done to success the mission
   * @param {String} roleName The name of the role which the mission is assigned to
   * @param {String} desc The missions description
   */
  addMission(name, action, roleName, desc) {
    return this.missions.push(new Mission(name, action, this.roles[roleName], desc));
  }

  /**
   * addAction store an action in the current Game object.
   * @param {String} name Action's name
   * @param {Function} effect Effect of the action, function with
   * 2 parameters yoFurself:Player and others:[Player]
   * @param {boolean} affectYourself Is this action affecting yourself ?
   * @param {int} affectOthers How many other players are affected
   */
  addAction(name, effect, affectYourself, affectOthers) {
    return this.actions.push(new Action(name, effect, affectYourself, affectOthers));
  }

  /**
   * addPlace store a place in the current Game object
   * @param {String} name Place's name
   * @param {String} description Place's description
   * @param {Array} objects Place's list of objects that the players can find
   */
  addPlace(name, description, objects) {
    return this.places.push(new Place(name, description, objects));
  }

  /**
   * @param {String} message The message of the choice
   * @param {Array} poss The array of possibilities
   * @param {Number} min The minimum of elements to choose
   * @param {Number} max The maximum of elements to choose
   */


  // ################################ UTILS ########################################

  choiceGenerator(message, poss, min, max) {
    return {
      message,
      possibilities: poss,
      min,
      max,
    };
  }

  /**
   * Liste des informations a donner au player pour qu'il affiche sa homepage dans l'appli
   * @param {Player} player le player qui a demandé sa homePage
   */
  getHomePage(player, callback) {
    if (player.role == null) {
      callback('Player has no role set', null);
      return;
    }
    const data = {
      characterName: player.role.name,
      characterPhoto: null,
      characterSummaryRole: player.role.summary,
      characterHints: player.inventory,
      scenarioTitle: this.name,
      scenarioSummary: this.summary,
    };
    callback(null, data);
  }

  getMyPlayer(player, callback) {
    if (player.role == null) {
      callback('Player has no role set', null);
      return;
    }
    const data = {
      characterRole: player.role,
    };
    callback(null, data);
  }

  /**
   * Send update of connected players to the socket
   */
  sendSetupUpdate() {
    const playersToSend = [];
    this.players.forEach((player) => {
      playersToSend.push(player.getSetupSummary());
    });
    const content = {
      type: 'updatePlayers',
      status: 'ok',
      token: null,
      data: {
        players: playersToSend,
      },
    };
    sendMessageToSocket(this.gameMasterSocket, content);
  }

  getSetup(callback) {
    const playersToSend = [];
    this.players.forEach((player) => {
      playersToSend.push(player.getSetupSummary());
    });
    const data = {
      gameDescription: this.description,
      rolesNames: Object.keys(this.roles),
      players: playersToSend,
    };
    callback(null, data);
  }

  /**
   * notification send a message to a player
   * @param {Player} player The player to send the notification
   * @param {String} type info, warn, death, announce
   * @param {String} message The message to display
   */
  notification(player, type, message) {
    this.sendOKToPlayer(player.socket, 'notification', { type, message });
  }

  // ############################## HANDLERS ######################################

  /**
 * handle Websocket request from the player
 * @param {Websocket} websocket the sender websocket
 * @param {Object} received all the data received with the request
 */
  handlePlayerUpdate(websocket, received, tokenPayload) {
  // TODO: identify the player who made the request
    let response = { status: 'ok', token: null };
    let error = true;
    this.players.forEach((player) => {
      error = false;
      if (player.name == tokenPayload.user && player.password == tokenPayload.pass) {
        switch (received.type) {
          case 'getHomePage':
            response.type = 'getHomePage';
            this.getHomePage(player, (err, data) => {
              if (err != null) {
                response.status = 'error';
                response.data = {
                  message: err,
                };
              } else {
                response.data = data;
              }
            });
            break;
          case 'setRole':
            response.type = 'setRole';
            this.setPlayerRolePref(player, received.data.roleName, (err) => {
              if (err != null) {
                response.status = 'error';
                response.data = {
                  message: err,
                };
              } else {
                response.data = {};
                this.sendSetupUpdate();
              }
            });
            break;
          case 'getMyPlayer':
            response.type = 'getMyPlayer';
            this.getMyPlayer(player, (err, data) => {
              if (err != null) {
                response.status = 'error';
                response.data = {
                  message: err,
                };
              } else {
                response.data = data;
              }
            });
            break;
          case 'getMyActions':
          // TODO
            break;
          case 'getEventPage':
          // TODO
            break;
          case 'getPlayersPage':
          // TODO
            break;
          case 'getPlayerData':
          // TODO
            break;
          case 'getMyInventoryPage':
          // TODO
            break;
          case 'getMyObjectPage':
          // TODO
            break;
          default:
            break;
        }
        sendMessageToSocket(websocket, response);
      }
    });
    if (error) {
      response = {
        type: received.type,
        status: 'error',
        token: null,
        data: {
          message: 'unable to find player',
        },
      };
      sendMessageToSocket(websocket, response);
    }
  }

  handleGmUpdate(websocket, received) {
    switch (received.type) {
      case 'getSetup':
        this.getSetup((err, data) => {
          if (err != null) {
            this.sendErrorToGm('getSetup', err);
          } else {
            this.sendOKToGm('getSetup', data);
          }
        });
        break;
      case 'setPlayerRole':
        this.getPlayerFromName(received.data.playerName)
          .then((player) => {
            this.getRoleFromName(received.data.roleName)
              .then((role) => {
                player.setRole(role);
                this.sendOKToGm('setPlayerRole', {});
                this.sendOKToPlayer(player.socket, 'reloadPage', {});
              })
              .catch((err) => {
                this.sendErrorToGm('setPlayerRole', err);
              });
          })
          .catch((err) => {
            this.sendErrorToGm('setPlayerRole', err);
          });
        break;
      default:
        break;
    }
  }

  // ################################ SENDERS #################################

  sendOKToPlayer(socket, type, data) {
    const content = {
      type,
      status: 'ok',
      token: null,
      data,
    };
    sendMessageToSocket(socket, content);
  }

  sendErrorToPlayer(socket, type, message) {
    const content = {
      type,
      status: 'error',
      token: 'null',
      data: {
        message,
      },
    };
    sendMessageToSocket(socket, content);
  }

  sendOKToGm(type, data) {
    const content = {
      type,
      status: 'ok',
      token: null,
      data,
    };
    sendMessageToSocket(this.gameMasterSocket, content);
  }

  sendErrorToGm(type, message) {
    const content = {
      type,
      status: 'error',
      token: 'null',
      data: {
        message,
      },
    };
    sendMessageToSocket(this.gameMasterSocket, content);
  }
}


export default GameTemplate;
