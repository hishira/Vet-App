const userModel = require('../models/User');

class UserController{
    static async createUser(req,res){
        try{
            const user = new userModel({
                userID:req.body.userID,
                type:req.body.userTYPE? req.body.userTYPE:"USER"
            })
            await user.save();
            return res.status(200).json(user);
        }catch(e){
            return res.status(404).send(e.message);
        }
    }
    static async getUserInfo(req,res){
        try{
            const user = userModel.findOne({userID:req.body.userID});
            return res.status(200).json(user)
        }catch(e){
            return res.status(404).send("Error")
        }
    }
}
module.exports = UserController;