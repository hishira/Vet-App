const express = require('express')
const app = express()
const visitModel = require('../models/Visit')
const checkifAuthenticated = require("../middleware/authentication");

app.post('/visitcreate',checkifAuthenticated,async(req,res)=>{
    try{
        console.log(req.body)
        const newVisit = new visitModel({
            when: req.body.visitDay,
            time: req.body.time,
            pet: req.body.petID,
            user: req.body.userID
        })
        console.log(newVisit)
        await newVisit.save()
        return res.status(200).json(newVisit)
    }catch(e){
        console.log(e)
        return res.status(500).send("Server error")
    }
})
app.post("/uservisits",checkifAuthenticated,async(req,res)=>{
    try{
        const userVisits = await visitModel.find({user:req.body.userID})
        return res.status(200).json(userVisits)
    }catch(e){
        return res.status(500).send("Server error")
    }
})
module.exports = app