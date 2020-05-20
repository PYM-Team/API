/* eslint-disable import/prefer-default-export */

import { Module } from './module';

/**
 * Definition d'une structure de base d'une mission dans le jeu
 * @param
 */
export class Mission extends Module {
  constructor(name, actions, desc) {
    super(name, actions);
    this.description = desc;
  }
}
