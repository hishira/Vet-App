const express = require("express")
const app = express();
const RecipController = require("../controllers/RecipController");
const checkifAuthenticated = require("../middleware/authentication");
app.post("/recipcreate",checkifAuthenticated,RecipController.Create);
app.post("/recipedit",checkifAuthenticated,RecipController.Edit);
app.post("/getbyvisit",checkifAuthenticated,RecipController.GetByVisit);
app.post("/recipdelete",checkifAuthenticated,RecipController.Delete);
module.exports = app;