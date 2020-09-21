const firebaseadmin = require('firebase-admin')
const express = require('express')
const app = express()
let checkifAuthenticated = async (req,res,next)=>{
    try{
        const userinfo = await firebaseadmin.auth().verifyIdToken(req.headers.authorization.split(" ")[1])
        next()
    }catch(e){
        return res.status(400).send("You are not authenticated")
    }
}
app.use(checkifAuthenticated)
module.exports = checkifAuthenticated