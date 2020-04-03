import { Trigger } from './trigger';

/* eslint-disable import/prefer-default-export */
const schedule = require('node-schedule');

/**
 * Test if the argument is a valid date
 * @param {Date} date A date object to test
 */
function isValidDate(date) {
  // eslint-disable-next-line no-restricted-globals
  return date && Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date);
}
/**
 * Definition d'une structure de base d'un trigger du jeu : Une date
 */
export class Horloge extends Trigger {
  constructor(name, date, effect) {
    if (isValidDate(date)) {
      super(name, schedule.scheduleJob(date, effect), effect);
    } else {
      console.log('The provided date is not valid');
      super(null, null, null);
    }
  }
}
