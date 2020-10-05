const mongoose = require('mongoose')
const Schema = mongoose.Schema
const clinicSchema = new Schema({
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Clinic",clinicSchema)