/* eslint-disable import/prefer-default-export */
/**
 * Definition d'une structure de base d'un role du jeu
 * @param
 */
export class Role {
  constructor(name, description, mission, basicObjets) {
    this.name = name || null;
    this.description = description || null;
    this.mission = mission || null;
    this.basicObjets = basicObjets || null;
  }
}
