const express = require("express");
const app = express();
const NoteController = require("../controllers/NoteController");
const checkIfAuthenticated = require("../middleware/authentication")
app.post("/createnote",checkIfAuthenticated,NoteController.Create);
app.post("/editnote",checkIfAuthenticated,NoteController.Edit);

module.exports = app;