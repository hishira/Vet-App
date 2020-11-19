const userModel = require("../models/User");
const admin = require("firebase-admin");
class UserController {
  static async createUser(req, res) {
    try {
      let uid = "";
      uid = await admin
        .auth()
        .createUser({
          email: req.body.email,
          password: req.body.password,
          emailVerified: false,
          disabled: false,
        })
        .then((userRecord) => {
          return userRecord.uid;
        });
      console.log(uid);
      const user = new userModel({
        userID: uid,
        email: req.body.email,
        type: req.body.userTYPE ? req.body.userTYPE : "USER",
      });
      await user.save();
      return res.status(200).json(user);
    } catch (e) {
      console.log(e.message);
      return res.status(404).send(e.message);
    }
  }
  static async getUserInfo(req, res) {
    try {
      const user = await userModel.find({ userID: req.body.userID }).exec();
      return res.status(200).json(user);
    } catch (e) {
      return res.status(404).send("Error");
    }
  }
  static async getAllUser(req, res) {
    try {
      const users = await userModel.find({});
      return res.status(200).json(users);
    } catch (e) {
      return res.status(404).send("Server error");
    }
  }
  static async emailChange(req, res) {
    try {
      await admin
        .auth()
        .updateUser(req.body.uid, {
          email: req.body.email,
        })
        .then((userRecord) => console.log("OK"));
      const user = await userModel.findByIdAndUpdate(
        req.body.userID,
        { email: req.body.email },
        { new: true },
        (err, model) => {
          if (err) return res.status(404).send("Error while updating");
          return res.status(200).json(model);
        }
      );
    } catch (e) {
      return res.status(404).send("Server error");
    }
  }
  static async passwordChange(req, res) {
    try {
      await admin
        .auth()
        .updateUser(req.body.uid, { password: req.body.password })
        .then((userRecors) => console.log("Ok"));
      return res.status(200).json({ message: "OK" });
    } catch (err) {
      return res.status(404).send("Server error");
    }
  }
  static async deleteUser(req, res) {
    try {
      await admin
        .auth()
        .deleteUser(req.body.uid)
        .then(() => console.log("User successfull delete"));
      let user = await userModel.deleteOne({_id:req.body.userID});
      return res.status(200).send("OK");
    } catch (e) {
      return res.status(404).send("Server error");
    }
  }
}
module.exports = UserController;
