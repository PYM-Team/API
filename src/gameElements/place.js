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

  getClues() {
    const clues = [];
    this.objects.forEach((element) => {
      if (element.clue == true) {
        clues.push(element);
      }
    });
    return clues;
  }

  getNotClues() {
    const notClues = [];
    this.objects.forEach((element) => {
      if (element.clue == false) {
        notClues.push(element);
      }
    });
    return notClues;
  }
}
