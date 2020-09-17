const express = require("express");
const app = express();
const admin = require("firebase-admin");
const serviceAccount = require("./vet-app-554ba-firebase-adminsdk-viwhe-90ed202f78.json");
const port = 9000;
const firebase = require("./firebaseconfig")
require('dotenv').config()
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DB_URL,
});
/*firebase.auth().createUserWithEmailAndPassword("abc@abc.com",'123456').catch(err=>{
    console.log(err.message)
})*/
/*firebase.auth().signInWithEmailAndPassword("abc@abc.com",'123456').catch(err=>{})*/
app.get("/", async (req, res) => {
  let user = firebase.auth().currentUser
  res.json(user)
});
app.listen(port, () => {
  console.log("App listen on port 9000");
});
