/* eslint-disable import/prefer-default-export */
/**
 * Definition d'une structure de base d'une action du jeu
 * @param
 */
export class Action {
  constructor(name, effect, useNb, send, possible) {
    this.name = name || '';
    this.effect = effect || null;
    this.useNb = useNb || null;
    this.send = send || null;
    this.possible = possible || null;
  }

  decreaseUseNb() {
    this.useNb -= 1;
  }
}
