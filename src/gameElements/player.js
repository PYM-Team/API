/* eslint-disable import/prefer-default-export */

export class Player {
  /**
   * Constructeur d'un player dans une partie
   * @param {*} name Nom du player
   */
  constructor(name, socketid, gameId) {
    this.name = name || null;
    this.role = null;
    this.alive = true;
    this.socketId = socketid || null;
    this.gameId = gameId || null;
  }

  setAlive(a) {
    this.alive = a;
  }

  getRole() {
    return this.role.description;
  }

  setRole(role) {
    this.role = role;
  }

  setSocketID(id) {
    this.socketId = id;
  }

  // announce(message) {
  //   sendMessageToSocket(this.socketId, {
  //     type: 'announce',
  //     state: 'add',
  //     message,
  //   });
  // }
}
