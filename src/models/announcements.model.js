import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

/* Any id is declared because ids are automaticaly added */

const AnnouncementSchema = new Schema({
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// changing this line to export default mongoose.model(...) breaks the controller
module.exports = mongoose.model('Announcement', AnnouncementSchema);
