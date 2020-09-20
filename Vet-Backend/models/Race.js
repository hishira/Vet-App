const mongoose = require('mongoose')
const Schema = mongoose.Schema

const raceSchema = Schema({
    name:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model("Race",raceSchema)