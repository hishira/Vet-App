const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Units = Object.freeze({
  Gram: "g",
  Milliliter: "ml",
  Liter: "l",
  Kilogram: "k",
});
const medicineSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  producer: {
    type: String,
    required: true,
  },
  description:{
    type:String
  },
  unit: {
    type: String,
    required: true,
    enum: Object.values(Units),
  },
});
Object.assign(medicineSchema.statics, { Units });
module.exports = mongoose.model("Medicine", medicineSchema);
