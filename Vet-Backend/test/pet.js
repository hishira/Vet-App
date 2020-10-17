process.env.NODE_ENV = "test";
let mongoose = require("mongoose");
let chai = require("chai");
let server = require("../app");
const chaiHttp = require("chai-http");
let should = chai.should();
require("dotenv").config();
chai.use(chaiHttp);
const firebase = require("../firebaseconfig");
let token = "";
let user;
let petModel = require("../models/Pet")
describe("Test", () => {
  before(async () => {
    let uri = `mongodb+srv://admin:${process.env.PASSWORD}@${process.env.MONGOURL}/${process.env.DATABASETEST}?retryWrites=true&w=majority`;
    await mongoose
      .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log("Connect to mongoodb"))
      .catch((e) => console.log("Eror with connection"));
    let email = "abc@abc.com";
    let pass = "123456";
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .catch((err) => {console.log("Problem big")});
  });
  beforeEach(async()=>{
    user = firebase.auth().currentUser
    token = await user.getIdToken().then((res) => res)
  })
  it("Something", (done) => {
    chai
      .request(server)
      .get("/pet/pets")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  
  it("check if authorization token work", (done) => {
      chai
      .request(server)
      .get("/pet/petswithauth")
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(200);
        done()
      });
  });
  it("Unauthorized user cannot create pet",(done)=>{
    let pet = {
      name:"Stefan",
      age:12,
      species:"Dog",
      userID: user.uid
    }
    chai.request(server)
    .post("/pet/registerpet")
    .send(pet)
    .end((err,res)=>{
      res.should.have.status(400)
      done()
    });
  });
  it("Authorized user can add pet",(done)=>{
    let pet = {
      name:"Stefan",
      age:12,
      species:"Dog",
      userID: user.uid
    };
    chai.request(server)
    .post("/pet/registerpet")
    .set({Authorization: `Bearer ${token}`})
    .send(pet)
    .end((err,res)=>{
      res.should.have.status(200);
      done();
    }) 
  })
  it("User can see pet which belong to him",(done)=>{
    chai.request(server)
    .post("/pet/userpets")
    .set({Authorization:`Bearer ${token}`})
    .send({userID:user.uid})
    .end((err,res)=>{
      res.should.have.status(200);
      done();
    });
  });
  after(async ()=>{
    await petModel.deleteMany({})
  })
});
