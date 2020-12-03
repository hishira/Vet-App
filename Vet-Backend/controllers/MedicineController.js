const medicineModel = require("../models/Medicine");

class MedicineController {
  static async Create(req, res) {
    try {
      const medicine = new medicineModel({
        name: req.body.name,
        producer: req.body.producer,
        description: req.body.description,
        type: req.body.type,
        unit: req.body.unit,
      });
      await medicine.save();
      return res.status(200).json(medicine);
    } catch (e) {
      return res.status(404).send("server error");
    }
  }
  static async DeleteAll(req,res){
      try{
          medicineModel.deleteMany({},(err)=>{
              if(err){
                  return res.status(404).send("Problem with medicine delete");
              }
              return res.status(200).send("Ok, medicins delete");
          })
      }catch(e){
        return res.status(404).send("Server error");
      }
  }
}
module.exports = MedicineController;
