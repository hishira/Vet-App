const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = Schema({
    userID:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true,
        enum:["USER","ADMIN","DOCTOR"]
    }
})
module.exports = mongoose.model("User",userSchema)