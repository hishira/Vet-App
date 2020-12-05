const express = require("express");
const app = express();
const MedicineController = require("../controllers/MedicineController");
app.post("/createmedicine",MedicineController.Create);
app.post("/deleteall",MedicineController.DeleteAll);
app.get("/getall",MedicineController.GetAll);
module.exports = app;