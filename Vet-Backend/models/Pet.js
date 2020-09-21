const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const petSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age:{
    type:Number,
  },
  species:{
    type:String,
    required:true,
    enum:["Dog","Cat","Parrot","Hamster","Guinea Pig",]
  },
  userID:{
    type:String,
    required:true
  }
});
module.exports = mongoose.model("Pet",petSchema)
