const {model: { UserProfile } }=require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
// const generateAccessToken = require("./generateAccessToken")
const jwt = require("jsonwebtoken");
const {model: { User } }=require('../models');
module.exports={
    goal: async(req,res)=>{
        // console.log(req.userData)
        userEmail = req.userData.email
        // console.log(userEmail)
        const userExists = await User.findOne({ where: { email: userEmail} });
        // console.log(userExists)
        let userObject;
        if(userExists){
                console.log(userExists.dataValues)
                userObject = {
                        'goal':userExists.dataValues.goal
                }
                
                res.status(200).json({userData:userObject})

        }
    }
}