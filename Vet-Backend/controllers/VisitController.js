const visitModel = require("../models/Visit");
const petModel = require("../models/Pet")
class VisitController {
  static async createVisit(req, res) {
    try {
      console.log(req.body);
      const newVisit = new visitModel({
        when: req.body.visitDay,
        time: req.body.time,
        pet: req.body.petID,
        user: req.body.userID,
        clinic: req.body.clinicID,
      });
      console.log(newVisit);
      await newVisit.save();
      const petToVisit = await petModel.findById(req.body.petID);
      petToVisit.visitHistory.push(newVisit._id);
      await petToVisit.save();
      return res.status(200).json(newVisit);
    } catch (e) {
      console.log(e);
      return res.status(500).send("Server error");
    }
  }
  static async getUserVisits(req, res) {
    try {
      const userVisits = await visitModel.find({ user: req.body.userID });
      let arr = [];
      for (let i of userVisits) {
        i = await (await i.populate("clinic").execPopulate()).toJSON();
        arr.push(i);
      }
      for (let i of arr) {
        console.log(i);
        i["when"] = i["when"].toISOString().split("T")[0];
      }
      return res.status(200).json(arr);
    } catch (e) {
      return res.status(500).send("Server error");
    }
  }
  static async deleteVisit(req, res) {
    try {
      const visit = await visitModel.findByIdAndDelete(req.body.visitID);
      return res.status(200).json(visit);
    } catch (e) {
      return res.status(500).send("Server error");
    }
  }
}
module.exports = VisitController;
