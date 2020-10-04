process.env.NODE_ENV = 'test';
let mongoose = require('mongoose');
let chai = require('chai');
let server = require('../app');
const chaiHttp = require('chai-http');
let should = chai.should();
require("dotenv").config();
chai.use(chaiHttp)
describe("Test",()=>{
    before(async ()=>{
        let uri = `mongodb+srv://admin:${process.env.PASSWORD}@${process.env.MONGOURL}/${process.env.DATABASE}?retryWrites=true&w=majority`;
        await mongoose
        .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("Connect to mongoodb"))
        .catch((e) => console.log("Eror with connection"));
    })
    it("Something",(done)=>{
        chai.request(server).get("/pet/pets").end((err,res)=>{
            res.should.have.status(200)
            done()
        })
    })
})