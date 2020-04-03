/* eslint-disable import/prefer-default-export */
/**
 * Definition d'une structure de base d'un module de jeu
 * @param
 */
export class Module {
  constructor(name, action) {
    this.name = name || null;
    this.action = action || null;
  }
}
