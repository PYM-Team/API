/* eslint-disable no-console */

import { Role } from '../gameElements/role';
import { Player } from '../gameElements/player';
import { Mission } from '../gameElements/modules/mission';
import { Action } from '../gameElements/action';


import { sendMessageToPlayers, sendMessageToSocket } from '../websockets';

class GameTemplate {
  constructor(name) {
    this.name = name || null;
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
          console.log('already running game');
        } else if (this.howManyRoles() !== this.howManyPlayers()) {
          console.log('not enough players');
        } else {
          this.assignRoles();
          this.started = true;
          console.log('game starts !');
          this.players.forEach((player) => {
            const content = {
              role: player.role,
              name: player.name,
              alive: player.alive,
            };
            sendMessageToSocket(player.socket, content);
            console.log('message sent');
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
          console.log('Game stopped');
        } else {
          console.log('Not started game cant be stopped');
        }
      },
    };
  }

  /**
   * set the game's id
   * @param {Number} gameId the game's id
   */
  setGameId(gameId) {
    this.gameId = gameId;
  }

  getRequest(content) {
    // eslint-disable-next-line no-prototype-builtins
    if (this.functions.hasOwnProperty(content.action)) {
      this.functions[content.action]();
    }
  }

  getPlayers() {
    return this.players;
  }

  /**
   * Add the gameMaster socketId to the game
   * @param {Websocket} socket The gameMaster's socket
   */
  addGameMaster(socket) {
    this.gameMasterSocket = socket;
  }

  /**
   * Create a new player and add it to players list
   * @param {String} name The player's name
   * @param {Websocket} socket The player's socket
   */
  addPlayer(name, socket, roleName) {
    const p = new Player(name, socket, this.roles[roleName]);
    this.players.push(p);
    const content = {
      gameId: this.gameId,
      players: this.players,
    };
    sendMessageToSocket(this.gameMasterSocket, content);
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

  /**
   * addRole is used to create a new Role to have in the current game template
   * @param {String} name Role name
   * @param {String} desc Role description
   */
  addRole(name, desc) {
    this.roles[name] = new Role(name, desc);
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
}

export default GameTemplate;
