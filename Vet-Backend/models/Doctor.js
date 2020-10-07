const mongoose = require('mongoose')
const Schema = mongoose.Schema
const doctorSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:String,
    },
    animalCareType:[
        {
            type:"String",
            required:true,
            enum:["Dog","Cat","Parrot","Hamster","Guinea Pig",]
        }
    ],
    clinic:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Clinic"
    },
}) 
module.exports = mongoose.model("Doctor",doctorSchema)