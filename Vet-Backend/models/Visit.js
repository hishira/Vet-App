const mongoose = require('mongoose')
const Schema = mongoose.Schema

const visitSchema = Schema({
    description:{
        type:String,
    },
    when:{
        type:Date
    }
})

module.exports = mongoose.model('Visit',visitSchema)