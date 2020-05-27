/* eslint-disable import/prefer-default-export */

export class Player {
  /**
   * The player object constructor
   * @param {String} name the player name
   * @param {String} pass the player hashed password
   * @param {Websocket} socket the player socket
   */
  constructor(name, pass, socket) {
    this.name = name || null;
    this.password = pass || null;
    this.role = null;
    this.rolePref = null;
    this.alive = true;
    this.protected = false;
    this.spied = null;
    this.poisoned = false;
    this.inventory = [];
    this.socket = socket || null;
    this.connected = true;
    this.lastAction = null;
  }

  /**
   * Set if player is alive or dead
   * @param {Boolean} a The player life state
   */
  setAlive(a) {
    this.alive = a;
  }

  /**
   * Set player protection
   * @param {Boolean} p Set if the player is protected or not
   */
  setProtected(p) {
    this.protected = p;
  }

  /**
   * Set if the player is spied or not
   * @param {Boolean} s spied
   */
  setSpied(s) {
    this.spied = s;
  }

  setPoisoned(p) {
    this.poisoned = p;
  }

  /**
   * Set the last action made
   * @param {String} a The last action name
   */
  setLastAction(a) {
    this.lastAction = a;
  }

  /**
   * Set the role pref name
   * @param {String} name The role name
   */
  setRolePref(name) {
    this.rolePref = name;
  }

  setDisconnected() {
    this.connected = false;
  }

  /**
   * Get the summary for the setup request
   */
  getSetupSummary() {
    return { name: this.name, connected: this.connected, prefered: this.rolePref };
  }

  /**
   * Get the summary for the overview request
   */
  getOverviewSummary() {
    return { name: this.name, connected: this.connected, role: this.role };
  }

  /**
   * Get the summary for the Mg page request
   */
  getMgSummary() {
    const relations = [];
    Object.keys(this.role.relations).forEach((r) => {
      relations.push({ target: r, thought: this.role.relations[r] });
    });
    return {
      connected: this.connected,
      role: this.role.name,
      description: this.role.description,
      state: this.alive,
      lastAction: this.lastAction,
      inventory: this.inventory,
      relations,
    };
  }

  getProperties() {
    return {
      poisonned: this.poisonned,
      protected: this.protected,
      alive: this.alive,
    };
  }

  /**
   * Get the player role descrption
   */
  getRole() {
    return this.role.description;
  }

  /**
   * Set the player role
   * @param {Role} role The new player role
   */
  setRole(role) {
    this.role = role;
    this.inventory = role.basicObjects;
  }

  /**
   * @returns {Array} All the clues in inventory
   */
  getClues() {
    const clues = [];
    this.inventory.forEach((element) => {
      if (element.clue == true) {
        clues.push(element);
      }
    });
    return clues;
  }

  /**
   * @returns {Array} all the non-clues objects in inventory
   */
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
