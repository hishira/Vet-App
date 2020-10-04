const express = require("express");
const app = express();
const petModel = require("../models/Pet");
const checkifAuthenticated = require("../middleware/authentication");
app.post("/registerpet", checkifAuthenticated, async (req, res) => {
  try {
    console.log(req.body);
    const pet = new petModel({
      name: req.body.name,
      age: req.body.age,
      species: req.body.species,
      userID:req.body.userID
    });
    console.log(pet);
    await pet.save();
    return res.status(200).json(pet);
  } catch (e) {
    return res.status(404).send(e.message);
  }
});
app.post("/userpets", checkifAuthenticated,async(req,res)=>{
  try{
    const pets = await petModel.find({userID:req.body.userID})
    console.log(pets)
    return res.status(200).json(pets).end()
  }catch(err){
    return res.status(500).send("Server error")
  }
})
app.post("/deletepet",checkifAuthenticated,async(req,res)=>{
  try{
    const pet = await petModel.findByIdAndDelete(req.body.petID)
    return res.status(200).json(pet)
  }catch(e){
    return res.status(500).send("Server error")
  }
})
app.get("/pets",async(req,res)=>{
  try{
    const pet = await petModel.find({})
    return res.status(200).json(pet)
  }catch(e){
    return res.status(500).send("server error")
  }
})
app.get("/petswithauth",checkifAuthenticated,async(req,res)=>{
  try{
    const pet = await petModel.find({})
    return res.status(200).json(pet)
  }catch(e){
    return res.status(500).send("server error")
  }
})
module.exports = app;
