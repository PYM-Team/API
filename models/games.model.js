const mongoose = require('mongoose');

const { Schema } = mongoose;

/* Any id is declared because ids are automaticaly added */

const GameSchema = new Schema({});

module.exports = mongoose.model('Game', GameSchema);
