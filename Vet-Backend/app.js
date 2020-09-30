const express = require("express");
const app = express();
const admin = require("firebase-admin");
const serviceAccount = require("./vet-app-554ba-firebase-adminsdk-viwhe-90ed202f78.json");
const port = 9000;
const firebase = require("./firebaseconfig");
require("dotenv").config();
const mongoose = require("mongoose");
const petrouter = require("./routes/pet")
const visitrouter = require('./routes/visit')
const bodypareser = require("body-parser")
const cors = require('cors')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DB_URL,
});
/*firebase.auth().createUserWithEmailAndPassword("abc@abc.com",'123456').catch(err=>{
    console.log(err.message)
})*/
/*firebase.auth().signInWithEmailAndPassword("abc@abc.com",'123456').catch(err=>{})*/
let uri = `mongodb+srv://admin:${process.env.PASSWORD}@${process.env.MONGOURL}/${process.env.DATABASE}?retryWrites=true&w=majority`;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connect to mongoodb"))
  .catch((e) => console.log("Eror with connection"));
let db = mongoose.connection;
app.use(bodypareser.json())
app.use(bodypareser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));
app.use("/pet",petrouter)
app.use("/visit",visitrouter)
db.once("open", () => {
  app.get("/", async (req, res) => {
    /*
    let user = firebase.auth().currentUser;
    let token = await user.getIdToken().then(res=>res)
    let userid = user.uid
    res.json({token:token,id:userid});
    */
  });
  app.listen(port, () => {
    console.log("App listen on port 9000");
  });
});
