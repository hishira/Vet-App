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
let clinicModel = require('../models/Clinic')
let petid 
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
  describe("Prepare",()=>{
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
  });
  describe("Pet controller, pet routes",()=>{
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
        should.not.exist(err)
        res.should.have.status(200);
        res.should.have.property("body")
        .and.to.be.an("object");
        res.should.have.property("body")
        .and.have.all
        .keys("name","age","species","userID","visitHistory","__v","_id");
        done();
      }) 
    })
    it("User can see pet which belong to him",(done)=>{
      chai.request(server)
      .post("/pet/userpets")
      .set({Authorization:`Bearer ${token}`})
      .send({userID:user.uid})
      .end((err,res)=>{
        petid = res.body[0]._id;
        res.should.have.status(200);
        res.should.have.property("body");
        res.should.have.property("body")
        .to.be.an("array");
        res.should.have.property("body")
        .to.be.an("array")
        .that.is.not.empty;
        done();
      });
    });
    it("User can delete pet",(done)=>{
      chai.request(server)
      .post("/pet/deletepet")
      .set({Authorization:`Bearer ${token}`})
      .send({petID:petid})
      .end((err,res)=>{
        res.should.have.status(200);
        res.should.have.property("body")
        .to.be.an("object")
        done();
      })
    })
    it("Can we get all pet, is it secure?",(done)=>{
      chai.request(server)
      .get("/pet/pets")
      .end((err,res)=>{
        res.should.have.status(200);
        res.should.have.property("body");
        res.should.have.property("body")
        .to.be.an("array")
        .and.that.is.empty;
        done();
      })
    })
    it("Get all pet but with auth",(done)=>{
      chai.request(server)
      .get("/pet/petswithauth")
      .set({Authorization:`Bearer ${token}`})
      .end((err,res)=>{
        res.should.have.status(200);
        res.should.have.property("body");
        res.should.have.property("body")
        .to.be.an("array")
        .and.that.is.empty;
        done();
      })
    })
    it("Prepare pet",(done)=>{
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
        should.not.exist(err)
        petid = res.body._id;
        res.should.have.status(200);
        done();
      }) 
    })
    it("Get pet by id with usefull information",(done)=>{
      chai.request(server)
      .post("/pet/petbyid")
      .set({Authorization: `Bearer ${token}`})
      .send({petID:petid})
      .end((err,res)=>{
        should.not.exist(err);
        res.should.have.status(200);
        res.should.have.property("body")
        .to.be.an("object");
        res.should.have.property("body")
        .to.be.an("object").
        and.have.all.keys("name","age","species","userID","visitHistory","__v","_id");
        res.should.have.property("body")
        .to.be.an("object")
        .and.have.property("visitHistory")
        .to.be.an("array");
        done();
      }) 
    })
  });
  describe("Clinic controller, clinic routes",()=>{
    it("Without role, someone can add clinic",(done)=>{
      let clinic = {
        city:"Warszawa",
        address: "Os. bohaterów",
        citylatitude: 12,
        citylongitude: 45,
        addresslatitude: 54,
        addresslongitude:56
      };
      chai.request(server)
      .post("/clinic/createclinic")
      .send(clinic)
      .end((err,res)=>{
        res.should.have.status(200)
        res.should.have.property("body")
        .to.be.an("object");
        res.should.have.property("body")
        .to.be.an("object")
        .and.have.any.keys("city","address");
        done();
      });
    });
    it("We can fetch clinics by city",(done)=>{
      chai.request(server)
      .post("/clinic/clinicsbycity")
      .send({city:"Warszawa"})
      .end((err,res)=>{
        res.should.have.status(200);
        res.should.have.property("body");
        res.should.have.property("body").and.be.an("array");
        res.should.have.property("body")
        .to.be.an("array")
        .to.have.length.gt(0);
        done();
      });
    });
    it("We can get all citied",(done)=>{
      chai.request(server)
      .get("/clinic/getallclinic")
      .end((err,res)=>{
        res.should.have.status(200);
        res.should.have.property("body");
        res.should.have.property("body")
        .to.be.an("array");
        res.should.have.property("body")
        .to.be.an("array")
        .and.have.length.gt(0);
        done();
      })
    });
  })
  after(async ()=>{
    await petModel.deleteMany({});
    await clinicModel.deleteMany({});
  })
});
