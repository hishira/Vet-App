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
    },
    citylatitude:{
        type:Number,
    },
    citylongitude:{
        type:Number
    },
    addresslatitude:{
        type:Number
    },
    addresslongitude:{
        type:Number
    }
})

module.exports = mongoose.model("Clinic",clinicSchema)