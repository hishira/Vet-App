const express = require("express");
const app = express();
const NoteController = require("../controllers/NoteController");
const checkifAuthenticated = require("../middleware/authentication");
app.post("/createnote",checkifAuthenticated,NoteController.Create);
app.post("/editnote",checkifAuthenticated,NoteController.Edit);

module.exports = app;