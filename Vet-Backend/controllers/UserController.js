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
            const user = await userModel.find({userID:req.body.userID}).exec();
            return res.status(200).json(user)
        }catch(e){
            return res.status(404).send("Error")
        }
    }
    static async getAllUser(req,res){
        try{
            const users = await userModel.find({});
            return res.status(200).json(users);
        }catch(e){
            return res.status(404).send("Server error");
        }
    }
}
module.exports = UserController;