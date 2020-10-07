const express = require('express');
const app = express();
const doctorModel = require('../models/Doctor');

app.post("/adddoctor",async(req,res)=>{
    try{
        const doctor = new doctorModel(req.body);
        await doctor.save();
        return res.status(200).json(doctor);
    }catch(e){
        return res.status(500).send("Error");
    }
})
app.post("/doctorsbyclinic",async(req,res)=>{
    try{
        const doctors = await doctorModel.find({clinic:req.body.clinicID});
        return res.status(200).json(doctors);
    }catch(e){
        return res.status(500).send("Server error");
    }
})

module.exports = app;