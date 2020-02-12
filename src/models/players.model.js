import mongoose from 'mongoose';
import Game from './games.model';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

/* Any id is declared because ids are automaticaly added */

const PlayerSchema = new Schema({
  id: { type: Number, required: true },
  game: { type: Game, required: true },
});

// changing this line to export default mongoose.model(...) breaks the controller
module.exports = mongoose.model('Player', PlayerSchema);
