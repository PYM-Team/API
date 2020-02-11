import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;

/* Any id is declared because ids are automaticaly added */

const GameSchema = new Schema({});

export default model('Game', GameSchema);
