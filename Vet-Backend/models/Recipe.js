const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const recipeSchema = new Schema({
    createDate:{
        type:Date,
        default:Date.now()
    },
    editDate:{
        type:Date,
        default:Date.now()
    },
    medicines:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Medicine"
        }
    ],
    note:{
        type:String,
    }
});
module.exports = mongoose.model("Recipe",recipeSchema);