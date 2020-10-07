const clinicModel = require("../models/Clinic");
const express = require("express")
const app = express()
class ClinicController {
  static async createClinic(req, res,next) {
    try {
      const createClinic = new clinicModel({
        city: req.body.city,
        address: req.body.address,
      });
      await createClinic.save();
      return res.status(200).json(createClinic);
    } catch (e) {
      return res.status(500).send("Server error");
    }
  }
  static async getClinicsByCity(req,res,next){
    try{
        const clinicsByCity = await clinicModel.find({city:req.body.city})
        return res.status(200).json(clinicsByCity)
    }catch(e){
        return res.status(500).send("Server error")
    }
  }
  static async getAllClinics(req,res,next){
    try{
        const allclinics = await clinicModel.find({})
        return res.status(200).json(allclinics)
    }catch(e){
        return res.status(500).send("Server error")
    }
  }
}
module.exports = ClinicController
