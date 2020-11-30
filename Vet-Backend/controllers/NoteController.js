const noteModel = require("../models/Note");

class NoteController {
  static async Create(req, res) {
    try {
      const note = new noteModel({
        content: req.body.content,
        petID: req.body.petID,
        visitID: req.body.visitID,
      });
      await note.save();
      return res.status(200).json(note);
    } catch (e) {
      return res.status(404).send("Server error");
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
}
module.exports = NoteController;