const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const petSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  race: [
    {
      type: Schema.Types.ObjectId,
      ref: "Race",
    },
  ],
});
module.exports = mongoose.model("Pet",petSchema)
