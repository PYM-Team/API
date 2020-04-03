/* eslint-disable import/prefer-default-export */
/**
 * Definition d'une structure de base d'une action du jeu
 * @param
 */
export class Action {
  constructor(name, effect, affectYourself, affectOthers) {
    this.name = name || '';
    this.effect = effect || null;
    this.affectYourself = affectYourself || false;
    this.affectOthers = affectOthers || 0;
  }
}
