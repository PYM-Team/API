/* eslint-disable import/prefer-default-export */

export class Player {
  /**
   * Constructeur d'un player dans une partie
   * @param {*} name Nom du player
   */
  constructor(name, pass, socket, role) {
    this.name = name || null;
    this.password = pass || null;
    this.role = role || null;
    this.alive = true;
    this.protected = false;
    this.spied = false;
    this.inventory = [];
    this.socketId = socket || null;
  }

  setAlive(a) {
    this.alive = a;
  }

  setProtected(a) {
    this.protected = a;
  }

  setSpied(a) {
    this.spied = a;
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
