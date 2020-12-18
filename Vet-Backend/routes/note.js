const express = require("express");
const app = express();
const NoteController = require("../controllers/NoteController");
const checkifAuthenticated = require("../middleware/authentication");
app.post("/createnote",checkifAuthenticated,NoteController.Create);
app.post("/editnote",checkifAuthenticated,NoteController.Edit);
app.post("/deletenote",checkifAuthenticated,NoteController.Delete);
app.post("/getbyvisit",checkifAuthenticated,NoteController.GetByVisit);
module.exports = app;