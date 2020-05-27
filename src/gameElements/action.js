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
    this.description = 'no description has been made for now'; // TODO
  }

  decreaseUseNb() {
    this.useNb -= 1;
  }

  getSummary(game, player) {
    return new Promise((resolve, reject) => {
      this.possible(game, player)
        .then((poss, errorMessage) => {
          if (poss) {
            resolve({
              possible: true,
              errorMessage: null,
              description: this.description,
            });
          }
          resolve({
            possible: false,
            errorMessage,
            description: this.description,
          });
        })
        .catch((err) => reject(err));
    });
  }
}
