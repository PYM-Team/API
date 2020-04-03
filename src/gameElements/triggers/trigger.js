/* eslint-disable import/prefer-default-export */

/**
 * Definition d'une structure de base d'un trigger du jeu
 */
export class Trigger {
  constructor(name, event, effect) {
    this.name = name || null;
    this.event = event || null;
    this.effect = effect || null;
  }
}
