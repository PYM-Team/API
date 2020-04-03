/* eslint-disable import/prefer-default-export */
/**
 * Definition d'une structure de base d'une role du jeu
 * @param
 */
export class Role {
  constructor(name, description) {
    this.name = name || null;
    this.description = description || null;
  }
}
