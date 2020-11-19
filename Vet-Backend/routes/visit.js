const express = require('express')
const app = express()
const VisitController = require('../controllers/VisitController')
const checkifAuthenticated = require("../middleware/authentication");

app.post('/visitcreate',checkifAuthenticated,VisitController.createVisit);
app.post("/uservisits",checkifAuthenticated,VisitController.getUserVisits);
app.post("/deletevisit",checkifAuthenticated,VisitController.deleteVisit);
app.post("/getallvisits",checkifAuthenticated,VisitController.getAllVisits);

module.exports = app