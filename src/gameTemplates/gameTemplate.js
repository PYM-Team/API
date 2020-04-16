/* eslint-disable no-console */

import { Role } from '../gameElements/role';
import { Player } from '../gameElements/player';
import { Mission } from '../gameElements/modules/mission';
import { Action } from '../gameElements/action';

import { sendMessageToGameMaster, sendMessageToPlayers, sendMessageToSocket } from '../socketio';

class GameTemplate {
  constructor(name) {
    this.name = name || null;
    this.gameId = null;
    this.started = false;
    this.actions = [];
    this.roles = [];
    this.players = [];
    this.gameMasterSocketId = null;
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
            sendMessageToSocket(player.socketId, content);
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

  /**
   * Add the gameMaster socketId to the game
   * @param {Number} socketId The id of the gameMaster Socket
   */
  addGameMaster(socketId) {
    this.gameMasterSocketId = socketId;
  }

  /**
   * Create a new player and add it to players list
   * @param {String} name The player's name
   * @param {Number} socketId The player's socketid
   */
  addPlayer(name, socketId) {
    const p = new Player(name, socketId);
    this.players.push(p);
    const content = {
      gameId: this.gameId,
      players: this.players,
    };
    sendMessageToGameMaster(this.gameMasterSocketId, content);
  }

  /**
   * Get the GM socket id
   */
  getGameMaster() {
    return this.gameMasterSocketId;
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
  addRole(name, desc, mission) {
    return this.roles.push(new Role(name, desc, mission));
  }

  /**
   * addMission store a new mission in the current Game object
   * @param {String} name The mission's name
   * @param {Action} action The action which can be done to success the mission
   * @param {Role} role The Role which the mission is assigned to
   * @param {String} desc The missions description
   */
  //  addMission(name, action, role, desc) {
  //    return this.missions.push(new Mission(name, action, role, desc));
  //  }

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
   * assignRole create players with already connected players in the game
   * @param {*} players players infos from the socket io client
   */
  assignRoles() {
    // Assign role to every players in the game.
    this.players.forEach((p) => {
      const role = this.roles.pop();
      p.setRole(role);
    });
  }
}

export default GameTemplate;
