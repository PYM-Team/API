/* eslint-disable import/prefer-default-export */
/**
 * Definition d'une structure de base d'un objet du jeu
 * @param
 */
export class GameObject {
  constructor(name, description, clue) {
    this.name = name;
    this.description = description || null;
    this.clue = clue || null;
  }

  isClue() {
    return this.clue;
  }
}
