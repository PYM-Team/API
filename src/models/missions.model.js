import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

/* Any id is declared because ids are automaticaly added */

const MissionSchema = new Schema({
  // penser au champ _id
  description: { type: Number, required: true },
  playerId: { type: Schema.Types.ObjectId, required: true },
  achieved: { type: Boolean, default: false },
  started: { type: Boolean, default: false },
});

// changing this line to export default mongoose.model(...) breaks the controller
module.exports = mongoose.model('Mission', MissionSchema);
