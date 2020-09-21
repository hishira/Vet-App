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
module.exports = app;
