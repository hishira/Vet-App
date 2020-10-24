const petModel = require("../models/Pet");
class PetController {
  static async createPet(req, res) {
    try {
      const pet = new petModel({
        name: req.body.name,
        age: req.body.age,
        species: req.body.species,
        userID: req.body.userID,
      });
      await pet.save();
      return res.status(200).json(pet);
    } catch (e) {
      return res.status(404).send(e.message);
    }
  }
  static async getUserPet(req, res) {
    try {
      const pets = await petModel.find({ userID: req.body.userID });
      return res.status(200).json(pets).end();
    } catch (err) {
      return res.status(500).send("Server error");
    }
  }
  static async deletePet(req, res) {
    try {
      const pet = await petModel.findByIdAndDelete(req.body.petID);
      return res.status(200).json(pet);
    } catch (e) {
      return res.status(500).send("Server error");
    }
  }
  static async getAllPets(req, res) {
    try {
      const pet = await petModel.find({});
      return res.status(200).json(pet);
    } catch (e) {
      return res.status(500).send("server error");
    }
  }
  static async getPetByID(req, res) {
    try {
      const pet = await petModel
        .findById(req.body.petID)
        .populate("visitHistory");
      for (let i of pet.visitHistory) {
        await i.populate("clinic").execPopulate();
      }
      let newpet = JSON.parse(JSON.stringify(pet));
      for (let i of newpet.visitHistory) {
        if (new Date(i.when) < Date.now()) i["whendate"] = "outdate";
        else i["whendate"] = "future";
      }
      console.log(newpet);
      return res.status(200).json(newpet);
    } catch (e) {
      return res.status(500).send("Server error");
    }
  }
  static async Update(req, res) {
    try {
      const pet = await petModel.findByIdAndUpdate(req.body.petID, {
        name: req.body.petName,
        age: req.body.petAge,
      },{new:true},(err,dane)=>{
        if(err)
          return res.status(404).send("Error while pet updating");
        return res.status(200).json(dane);
        });
    }catch(err){
      return res.status(500).send("Server error")
    }
  }
}
module.exports = PetController;
