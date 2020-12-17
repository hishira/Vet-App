const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const visitSchema = new Schema({
  when: {
    type: Date,
  },
  time: {
    type: String,
    required: true,
  },
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
  },
  user: {
    type: String,
  },
  clinic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clinic",
  },
  notes: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note",
      },
    ],
    validate: [notesLimit, "Maximum number of notes is 5"],
  },
});
function notesLimit(val) {
  return val.length <= 5;
}
module.exports = mongoose.model("Visit", visitSchema);
