const express = require("express");
const app = express();
const PetController = require("../controllers/PetController")
const checkifAuthenticated = require("../middleware/authentication");
app.post("/registerpet", checkifAuthenticated,PetController.createPet);
app.post("/userpets", checkifAuthenticated,PetController.getUserPet)
app.post("/deletepet",checkifAuthenticated,PetController.deletePet)
app.get("/pets",PetController.getAllPets)
app.get("/petswithauth",checkifAuthenticated,PetController.getAllPets)
module.exports = app;
