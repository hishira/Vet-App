const recipModel = require("../models/Recipe");

class RecipController {
  static async Create(req, res) {
    try {
      const recip = new recipModel({
        medicines: req.body.medicines,
      });
      await recip.save();
      return res.status(200).json(recip);
    } catch (e) {
      return res.status(404).send("server error");
    }
  }
  static async Edit(req, res) {
    try {
      await recipModel.update(
        { _id: req.body.recipID },
        { editDate: Date.now(), medicines: req.body.medicines }
      );
      return res.status(200).send("Ok, recip updated");
    } catch (e) {
      return res.status(404).send("Server error");
    }
  }
}
module.exports = RecipController;
