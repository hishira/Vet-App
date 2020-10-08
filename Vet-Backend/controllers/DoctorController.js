const doctorModel = require("../models/Doctor");
class DoctorController {
  static async createDoctor(req, res) {
    try {
      const doctor = new doctorModel(req.body);
      await doctor.save();
      return res.status(200).json(doctor);
    } catch (e) {
      return res.status(500).send("Error");
    }
  }
  static async getDoctorsByClinic(req, res) {
    try {
      const doctors = await doctorModel.find({ clinic: req.body.clinicID }).lean();
      for(let i of doctors)
        i.animalCareType = i.animalCareType.join(", ")
      return res.status(200).json(doctors);
    } catch (e) {
      return res.status(500).send("Server error");
    }
  }
}

module.exports = DoctorController