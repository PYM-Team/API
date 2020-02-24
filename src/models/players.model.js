import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

/* Any id is declared because ids are automaticaly added */

const PlayerSchema = new Schema({
  gameId: { type: Number, required: true },
});

// changing this line to export default mongoose.model(...) breaks the controller
module.exports = mongoose.model('Player', PlayerSchema);