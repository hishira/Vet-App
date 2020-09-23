const mongoose = require('mongoose')
const Schema = mongoose.Schema

const visitSchema = new Schema({
    description:{
        type:String,
    },
    when:{
        type:Date
    },
    pet:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Pet"
    }
})

module.exports = mongoose.model('Visit',visitSchema)