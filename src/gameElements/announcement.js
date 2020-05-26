/* eslint-disable import/prefer-default-export */
/**
 * Definition d'une structure de base d'une annonce du jeu
 * @param
 */
export class Announcement {
  /**
   * Annoucement constructor
   * @param {String} name The annoucement name
   * @param {Number} timer Between 0 and 1 the percentage of the global game duration
   * @param {String} description The annoucement description
   */
  constructor(name, timer, description) {
    this.name = name || null;
    this.timer = timer || 0;
    this.description = description || null;
    this.triggered = false;
  }

  /**
   * Return annouce summary
   */
  getSummary() {
    return {
      name: this.name,
      text: this.description,
      triggered: this.triggered,
      timer: this.timer,
    };
  }
}
