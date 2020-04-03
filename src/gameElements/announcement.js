/* eslint-disable import/prefer-default-export */
/**
 * Definition d'une structure de base d'une annonce du jeu
 * @param
 */
export class Announcement {
  constructor(name, date, description) {
    this.name = name || null;
    this.date = date || Date.now;
    this.description = description || null;
  }
}
