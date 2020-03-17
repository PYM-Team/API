import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

/* Any id is declared because ids are automaticaly added */

const GameSchema = new Schema({
  id: { type: Number, required: true },
  usernames: { type: Array, required: true },
});

// changing this line to export default mongoose.model(...) breaks the controller
module.exports = mongoose.model('Game', GameSchema);
