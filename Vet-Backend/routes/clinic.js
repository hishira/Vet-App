const express = require('express')
const app = express()
const clinicModel = require('../models/Clinic')
app.post('/createclinic',async(req,res)=>{
    try{
        const createClinic = new clinicModel({
            city:req.body.city,
            address:req.body.address
        })
        await createClinic.save()
        return res.status(200).json(createClinic)
    }catch(e){
        return res.status(500).send("Server error")
    }
})
app.post("/clinicsbycity",async(req,res)=>{
    try{
        const clinicsByCity = await clinicModel.find({city:req.body.city})
        return res.status(200).json(clinicsByCity)
    }catch(e){
        return res.status(500).send("Server error")
    }
})
app.get("/getallclinic",async(req,res)=>{
    try{
        const allclinics = await clinicModel.find({})
        return res.status(200).json(allclinics)
    }catch(e){
        return res.status(500).send("Server error")
    }
})
module.exports = app