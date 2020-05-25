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
    this.rolePref = null;
    this.alive = true;
    this.protected = false;
    this.spied = null;
    this.inventory = [];
    this.socket = socket || null;
    this.connected = true;
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

  setRolePref(name) {
    this.rolePref = name;
  }

  getSetupSummary() {
    return { name: this.name, connected: this.connected, prefered: this.rolePref };
  }

  getOverviewSummary() {
    return { name: this.role.name, connected: this.connected, role: this.role };
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
}
