/* eslint-disable import/prefer-default-export */
/**
 * Definition d'une structure de base d'un lieu du jeu
 * @param
 */
export class Place {
    constructor(name, description, objects) {
        this.name = name;
        this.description = description || null;
        this.objects = objects || null;
    }
}