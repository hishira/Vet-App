const express = require("express");
const app = express();
const UserController = require("../controllers/UserController");
const checkifAuthenticated = require("../middleware/authentication");
app.post("/usercreate",UserController.createUser);
app.post("/getuserinfo",checkifAuthenticated,UserController.getUserInfo)
module.exports = app;