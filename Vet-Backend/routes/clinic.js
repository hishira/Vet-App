const express = require('express')
const app = express()
const clinicModel = require('../models/Clinic')
const clinicController = require('../controllers/ClinicController')
app.post('/createclinic',clinicController.createClinic)
app.post("/clinicsbycity",clinicController.getClinicsByCity)
app.get("/getallclinic",clinicController.getAllClinics)
module.exports = app