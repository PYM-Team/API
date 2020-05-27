/* eslint-disable class-methods-use-this */

import schedule from 'node-schedule';
import { Role } from '../gameElements/role';
import { Player } from '../gameElements/player';
import { Mission } from '../gameElements/modules/mission';
import { Action } from '../gameElements/action';
import { Place } from '../gameElements/place';
import { Announcement } from '../gameElements/announcement';

import { sendMessageToSocket } from '../websockets';

class GameTemplate {
  constructor(name) {
    this.name = name || null;
    this.summary = null;
    this.description = null;
    this.started = false;
    this.paused = false;
    this.totalDuration = null;
    this.currentTime = null;
    this.actions = [];
    this.events = []; // annoucements
    this.triggers = {};
    this.roles = {};
    this.places = [];
    this.players = [];
    this.missions = []; // mission is still there in legacy purpose
    this.gameMasterSocket = null;
    this.functions = {};
    this.status = 'setup';
  }

  /**
   * set Every annoucements triggers
   */
  setTriggers() {
    if (this.totalDuration != null) {
      this.events.filter((e) => !e.hasBeenTriggered()).forEach((event) => {
        const triggerTime = this.totalDuration * event.timer;
        if (this.currentTime >= triggerTime) {
          this.triggerEvent(event);
        } else {
          const trigDate = new Date(Date.now() + (triggerTime - this.currentTime) * 1000);
          this.triggers[event.name] = schedule.scheduleJob(trigDate, () => {
            this.triggerEvent(event);
          });
        }
      });
    }
  }

  /**
   * cancel all the triggers
   */
  cancelTriggers() {
    Object.values(this.triggers).forEach((trig) => {
      trig.cancel();
    });
  }

  /**
   * trigger the specified event
   * @param {Announcement} event the event
   */
  triggerEvent(event) {
    this.players.forEach((p) => {
      this.notification(p, 'announce', event.description);
    });
    event.setTriggered(true);
  }

  /**
  * Change game started property to false
  */
  stopGame() {
    if (this.started) {
      this.players.forEach((p) => {
        this.notification(p, 'warn', 'La partie est finie !');
      });
      this.started = false;
      this.status = 'finish';
      this.cancelTriggers();
      this.sendOKToGm('stopGame', {});
    } else {
      this.sendErrorToGm('stopGame', 'The game has not even been started !');
    }
  }

  /**
  * Change game started property to true
  */
  startGame() {
    if (this.started) {
      this.sendErrorToGm('startGame', 'The game has already been started');
    } else {
      this.initTime();
      this.started = true;
      this.setTriggers();
      this.players.forEach((p) => {
        this.notification(p, 'info', 'La partie commence !');
      });
      this.sendOKToGm('startGame', {});
    }
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

  getPlayerFromRoleName(roleName) {
    return new Promise((resolve, reject) => {
      this.players.forEach((player) => {
        if (player.role.name == roleName) {
          resolve(player);
        }
      });
      reject(new Error('No player matching this role name'));
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

  getPlaceFromName(name) {
    return new Promise((resolve, reject) => {
      this.places.forEach((place) => {
        if (place.name == name) {
          resolve(place);
        }
      });
      reject(new Error('No player matching this role name'));
    });
  }

  getPlayersObjectFromName(player, objectName) {
    return new Promise((resolve, reject) => {
      player.inventory.forEach((object) => {
        if (object.name == objectName) {
          resolve(object);
        }
      });
      reject(new Error('No object matching this object name'));
    });
  }

  getStatus() {
    return this.status;
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
   * set the game duration
   */
  setDuration(d) {
    this.totalDuration = d;
  }

  /**
   * Set the description
   * @param {String} d the description
   */
  setDescription(d) {
    this.description = d;
  }

  /**
   * Set the summary
   * @param {String} s The summary
   */
  setSummary(s) {
    this.summary = s;
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
    callback(new Error('No role matching role name'));
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
  addRole(name, desc, mission, basicObjects, relations, actions, actionPoints) {
    this.roles[name] = new Role(
      name,
      desc,
      mission,
      basicObjects,
      relations,
      actions,
      actionPoints,
    );
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
    const mission = new Mission(name, action, this.roles[roleName], desc);
    this.missions.push(mission);
    return mission;
  }

  /**
   * addAction store an action in the current Game object.
   * @param {String} name Action's name
   * @param {Function} effect Effect of the action, function with
   * 2 parameters yoFurself:Player and others:[Player]
   * @param {boolean} affectYourself Is this action affecting yourself ?
   * @param {int} affectOthers How many other players are affected
   */
  addAction(name, effect, useNb, send, possible) {
    const action = new Action(name, effect, useNb, send, possible);
    this.actions.push(action);
    return action;
  }

  /**
   * @param {String} name the event name
   * @param {Number} timer between 0 and 1 the percentage of the total duration
   * @param {String} message the message to send to players
   */
  addEvent(name, timer, message) {
    const ann = new Announcement(name, timer, message);
    this.events.push(ann);
    return ann;
  }

  /**
   * addPlace store a place in the current Game object
   * @param {String} name Place's name
   * @param {String} description Place's description
   * @param {Array} objects Place's list of objects that the players can find
   */
  addPlace(name, description, objects) {
    const place = new Place(name, description, objects);
    this.places.push(place);
    return place;
  }

  // ################################ UTILS ########################################

  /**
   * initialise currentTime to 0
   */
  initTime() {
    this.currentTime = 0;
  }

  save() {
    return new Promise((resolve) => {
      resolve();
      // reject(new Error('Error while saving'));
    });
  }

  /**
   * @param {String} message The message of the choice
   * @param {Array} poss The array of possibilities
   * @param {Number} min The minimum of elements to choose
   * @param {Number} max The maximum of elements to choose
   */
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
      callback(new Error('Player has no role set'), null);
      return;
    }
    const data = {
      characterName: player.role.name,
      characterPhoto: null,
      characterSummaryRole: player.role.summary,
      characterHints: player.inventory.filter((o) => o.isClue()),
      scenarioTitle: this.name,
      scenarioSummary: this.summary,
    };
    callback(null, data);
  }

  getMyPlayer(player, callback) {
    if (player.role == null) {
      callback(new Error('Player has no role set'), null);
      return;
    }
    const data = {
      characterRole: player.role,
    };
    callback(null, data);
  }

  /**
   * Send the list of the roles names
   */
  getPlayersPage() {
    return new Promise((resolve, reject) => {
      const playersName = [];
      this.players.forEach((player) => {
        playersName.push(player.role.name);
      });
      resolve(playersName);
      reject(new Error('A problem occured'));
    });
  }

  getPlayerData(player, playerRoleName) {
    return new Promise((resolve) => {
      resolve([playerRoleName, player.role.relations[playerRoleName]]);
    });
  }

  getMyInventoryPage(player) {
    return new Promise((resolve) => {
      const myInventory = [];
      player.inventory.forEach((object) => {
        myInventory.push(object.name);
      });
      resolve(myInventory);
    });
  }

  getObjectPage(player, objectName) {
    return new Promise((resolve, reject) => {
      this.getPlayersObjectFromName(player, objectName)
        .then((obj) => {
          if (obj != null) {
            resolve(obj.description);
          } else {
            reject(new Error('The player doesn\'t have this object in his inventory'));
          }
        });
    });
  }

  /**
   * Get description of the player's actions
   */
  getMyActions(player) {
    return new Promise((resolve) => {
      const data = {};
      let itemProcessed = 0;
      data.characterActions = {};
      player.role.actions.forEach((action) => {
        action.getSummary(this, player)
          .then((summary) => {
            data.characterActions[action.name] = summary;
            itemProcessed += 1;
            if (itemProcessed == player.role.actions.length) {
              resolve(data);
            }
          });
      });
    });
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
   * Return the getOverview data
   */
  getOverview() {
    return new Promise((resolve) => {
      const playersToSend = [];
      this.players.forEach((p) => {
        playersToSend.push(p.getOverviewSummary());
      });
      const data = {
        gameDescription: this.description,
        gameId: this.name,
        globalDuration: this.totalDuration,
        remainingDuration: this.currentTime,
        players: playersToSend,
      };
      this.status = 'overview';
      resolve(data);
    });
  }

  getMasterPage() {
    return new Promise((resolve) => {
      const data = {};
      data.events = [];
      this.events.forEach((e) => {
        data.events.push(e.getSummary());
      });
      data.players = [];
      this.players.forEach((p) => {
        data.players.push(p.getMgSummary());
      });
      resolve(data);
    });
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
    let error = true;
    this.players.forEach((player) => {
      error = false;
      if (player.name == tokenPayload.user && player.password == tokenPayload.pass) {
        switch (received.type) {
          case 'getHomePage':
            this.getHomePage(player, (err, data) => {
              if (err != null) {
                this.sendErrorToPlayer(websocket, 'getHomePage', err.message);
              } else {
                this.sendOKToPlayer(websocket, 'getHomePage', data);
              }
            });
            break;
          case 'setRole':
            this.setPlayerRolePref(player, received.data.roleName, (err) => {
              if (err != null) {
                this.sendErrorToPlayer(websocket, 'setRole', err.message);
              } else {
                this.sendOKToPlayer(websocket, 'setRole', {});
                this.sendSetupUpdate();
              }
            });
            break;
          case 'getMyPlayer':
            this.getMyPlayer(player, (err, data) => {
              if (err != null) {
                this.sendErrorToPlayer(websocket, 'getMyPlayer', err.message);
              } else {
                this.sendOKToPlayer(websocket, 'getMyPlayer', data);
              }
            });
            break;
          case 'makeAction':
            if (player.role == null) {
              this.sendErrorToPlayer(websocket, 'makeAction', 'The specified player has no role');
            } else {
              let noAction = true;
              if (player.role.actions != null) {
                player.role.actions.forEach((action) => {
                  if (action.name == received.data.actionName) {
                    noAction = false;
                    let choices = [];
                    try {
                      choices = action.send(this, player);
                    } catch {
                      this.sendErrorToPlayer(websocket, 'makeAction', 'Scenario error in action send attribute');
                      return;
                    }
                    const data = {
                      choices,
                    };
                    this.sendOKToPlayer(websocket, 'makeAction', data);
                  }
                });
              }
              if (noAction) {
                this.sendErrorToPlayer(websocket, 'makeAction', 'The specified player has not this action');
              }
            }
            break;
          case 'actionResult':
            if (player.role == null) {
              this.sendErrorToPlayer(websocket, 'makeAction', 'The specified player has no role');
            } else {
              let noAction = true;
              if (player.role.actions != null) {
                player.role.actions.forEach((action) => {
                  if (action.name == received.data.actionName) {
                    noAction = false;
                    try {
                      action.effect(this, player, received.data.choices);
                    } catch {
                      this.sendErrorToPlayer(websocket, 'actionResult', 'Could not trigger the effect');
                      return;
                    }
                    this.sendOKToPlayer(websocket, 'actionResult', {});
                  }
                });
              }
              if (noAction) {
                this.sendErrorToPlayer(websocket, 'makeAction', 'The specified player has not this action');
              }
            }
            break;
          case 'getMyActions':
            this.getMyActions(player)
              .then((data) => this.sendOKToPlayer(websocket, 'getMyActions', data));
            break;
          case 'getEventsPage':
            this.sendOKToPlayer(websocket, 'getEventsPage', { events: this.events.filter((e) => e.hasBeenTriggered()) });
            break;
          case 'getPlayersPage':
            this.getPlayersPage()
              .then((playersName) => {
                const data = {
                  charactersName: playersName,
                  charactersPhotos: null,
                };
                this.sendOKToPlayer(websocket, 'getPlayersPage', data);
              })
              .catch((err) => {
                this.sendErrorToPlayer(websocket, 'getPlayersPage', err);
              });
            break;
          case 'getPlayerData':
            this.getPlayerData(player, received.data.playerRoleName)
              .then((result) => {
                const data = {
                  characterRole: result[0],
                  characterThoughts: result[1],
                };
                this.sendOKToPlayer(websocket, 'getPlayerData', data);
              })
              .catch((err) => {
                this.sendErrorToPlayer(websocket, 'getPlayerData', err);
              });
            break;
          case 'getMyInventoryPage':
            this.getMyInventoryPage(player)
              .then((playersObjects) => {
                const data = {
                  characterObject: playersObjects,
                };
                this.sendOKToPlayer(websocket, 'getMyInventoryPage', data);
              });
            break;
          case 'getObjectPage':
            this.getObjectPage(player, received.data.objectName)
              .then((objectDescriptionReceived) => {
                const data = {
                  objectDescription: objectDescriptionReceived,
                  objectPhoto: null,
                };
                this.sendOKToPlayer(websocket, 'getObjectPage', data);
              });
            break;
          default:
            break;
        }
      }
    });
    if (error) {
      this.sendErrorToPlayer(websocket, received.type, 'unable to find the player');
    }
  }

  handleGmUpdate(websocket, received) {
    switch (received.type) {
      case 'getSetup':
        this.getSetup((err, data) => {
          if (err != null) {
            this.sendErrorToGm('getSetup', err.message);
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
                this.sendErrorToGm('setPlayerRole', err.message);
              });
          })
          .catch((err) => {
            this.sendErrorToGm('setPlayerRole', err.message);
          });
        break;
      case 'announce':
        this.players.forEach((p) => {
          this.notification(p, 'announce', received.data.message);
        });
        this.sendOKToGm('announce', {});
        break;
      case 'pause':
        this.paused = true;
        this.currentTime = received.data.currentTime;
        this.cancelTriggers();
        this.sendOKToGm('pause', {});
        break;
      case 'resume':
        this.paused = false;
        this.setTriggers();
        this.sendOKToGm('resume', { currentTime: this.currentTime });
        break;
      case 'startGame':
        this.startGame();
        break;
      case 'stopGame':
        this.stopGame();
        break;
      case 'getOverview':
        this.getOverview()
          .then((data) => { this.sendOKToGm('getOverview', data); });
        break;
      case 'save':
        this.save()
          .then(this.sendOKToGm('save', {}))
          .catch((err) => this.sendErrorToGm('save', err.message));
        break;
      case 'getMg':
        this.getMasterPage()
          .then((data) => this.sendOKToGm('getMg', data));
        break;
      default:
        this.sendErrorToGm(received.type, 'This function does not exist');
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
