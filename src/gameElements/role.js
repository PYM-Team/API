/* eslint-disable import/prefer-default-export */
/**
 * Definition d'une structure de base d'un role du jeu
 * @param
 */
export class Role {
  constructor(name, description, mission, basicObjects, relations, actions, actionPoints) {
    this.name = name || null;
    this.summary = null;
    this.description = description || null;
    this.mission = mission || null;
    this.basicObjects = basicObjects || null;
    this.relations = relations || null;
    this.actions = actions || null;
    this.actionPoints = actionPoints || null;
  }
}
