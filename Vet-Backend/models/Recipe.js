const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const recipeSchema = new Schema({
  createDate: {
    type: Date,
    default: Date.now(),
  },
  editDate: {
    type: Date,
    default: Date.now(),
  },
  visit:{
    type:mongoose.Types.ObjectId,
    ref:"Visit"
  },
  medicines: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Medicine",
    },
  ],
});
module.exports = mongoose.model("Recipe", recipeSchema);
