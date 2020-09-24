const express = require('express')
const app = express()
const visitModel = require('../models/Visit')
app.post('/visitcreate',async(req,res)=>{
    try{
        const newVisit = new visitModel({
            when: req.bod.visitDate,
            time: req.body.time,
            pet: req.body.petID
        })
        await newVisit.save()
        return res.status(200).json(newVisit)
    }catch(e){
        return res.status(500).send("Server error")
    }
})