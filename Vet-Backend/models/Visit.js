const mongoose = require('mongoose')
const Schema = mongoose.Schema

const visitSchema = new Schema({
    when:{
        type:Date
    },
    time:{
        type:String,
        required:true
    },
    pet:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Pet"
    },
    user:{
        type:String
    },
    clinic:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Clinic"
    },
    notes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Note"
    }]
})

module.exports = mongoose.model('Visit',visitSchema)