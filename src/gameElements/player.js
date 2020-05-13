/* eslint-disable import/prefer-default-export */

export class Player {
  /**
   * Constructeur d'un player dans une partie
   * @param {*} name Nom du player
   */
  constructor(name, pass, socket) {
    this.name = name || null;
    this.password = pass || null;
    this.role = null;
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

  getClues() {
    const clues = [];
    this.inventory.forEach((element) => {
      if (element.clue == true) {
        clues.push(element);
      }
    });
    return clues;
  }

  getNotClues() {
    const notClues = [];
    this.inventory.forEach((element) => {
      if (element.clue == false) {
        notClues.push(element);
      }
    });
    return notClues;
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
