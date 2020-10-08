const express = require('express');
const app = express();
const DoctorController = require("../controllers/DoctorController")
app.post("/adddoctor",DoctorController.createDoctor)
app.post("/doctorsbyclinic",DoctorController.getDoctorsByClinic)
module.exports = app;