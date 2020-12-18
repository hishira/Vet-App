const noteModel = require("../models/Note");
const visitModel = require("../models/Visit");
class NoteController {
  static async Create(req, res) {
    try {
      const note = new noteModel({
        content: req.body.content,
        petID: req.body.petID,
        visitID: req.body.visitID,
      });
      await note.save();
      let visit = await visitModel.findById(req.body.visitID);
      visit.notes.push(note);
      await visit.save();
      return res.status(200).json(note);
    } catch (e) {
      return res.status(404).send(e.message);
    }
  }
  static async Edit(req, res) {
    try {
      const note = await noteModel.findByIdAndUpdate(
        req.body.noteID,
        {
          content: req.body.content,
          editDate: Date.now(),
        },
        { new: true },
        (err, data) => {
          if (err) return res.status(404).send("Problem with note updating");
          return res.status(200).json(data);
        }
      );
    } catch (e) {
      return res.status(404).send("Server error");
    }
  }
  static async Delete(req, res) {
    try {
      let note = await noteModel.findById(req.body.noteID).lean();
      let visit = await visitModel.findOne({ _id: note.visitID });
      console.log(visit);
      await visit.notes.pull(note._id);
      await visit.save();
      await noteModel.findOneAndDelete(
        { _id: req.body.noteID },
        (err, docs) => {
          if (err) return res.status(404).send("Problem with document delete");
          return res.status(200).send("OK");
        }
      );
    } catch (e) {
      return res.status(404).send("Server errror");
    }
  }
  static async GetByVisit(req, res) {
    try {
      let notes = await noteModel
        .find({visitID:req.body.visitID})
        .populate("petID")
        .exec();
      return res.status(200).json(notes);
    } catch (e) {
      return res.status(404).send("Server error");
    }
  }
}
module.exports = NoteController;
