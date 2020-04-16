/* eslint-disable import/prefer-default-export */

import { Module } from './module';

/**
 * Definition d'une structure de base d'une mission dans le jeu
 * @param
 */
export class Mission extends Module {
  constructor(name, action, desc) {
    super(name, action);
    this.description = desc;
  }
}
