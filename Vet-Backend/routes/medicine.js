const express = require("express");
const app = express();
const MedicineController = require("../controllers/MedicineController");
app.post("/createmedicine",MedicineController.Create);
app.post("/deleteall",MedicineController.DeleteAll);
module.exports = app;