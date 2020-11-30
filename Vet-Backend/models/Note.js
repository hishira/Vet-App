const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    createDate:{
        type:Date,
        default:Date.now()
    },
    editDate:{
        type:Date,
        default:Date.now()
    },
    content:{
        type:String,
        required:true
    },
    petID:{
        type:mongoose.Types.ObjectId,
        ref:"Pet"
    },
    visitID:{
        type:mongoose.Types.ObjectId,
        ref:"Visit"
    }
})
module.exports = mongoose.model("Note",noteSchema);