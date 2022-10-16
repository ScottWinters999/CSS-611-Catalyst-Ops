const {model: { UserProfile } }=require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
// const generateAccessToken = require("./generateAccessToken")
const jwt = require("jsonwebtoken");
const {model: { User } }=require('../models');
module.exports={
    userprofile: async(req,res)=>{
        // console.log(req.userData)
        userEmail = req.userData.email
        // console.log(userEmail)
        const userExists = await User.findOne({ where: { email: userEmail} });
        // console.log(userExists)
        let userObject;
        if(userExists){
                console.log(userExists.dataValues)
                userObject = {
                        'firstName':userExists.dataValues.firstName,
                        'lastName':userExists.dataValues.lastName,
                        'email':userExists.dataValues.email
                }
                
                res.status(200).json({userData:userObject})

        }
    }
//         const firstName=req.headers.firstName;
//         const lastName=req.headers.lastName;
//         const location=req.headers.location;
//         const currentPosition=req.headers.currentPosition;
//         const phoneNumber=req.headers.phoneNumber;
//         const industry=req.headers.industry;
//         const email=req.headers.email;
//         UserProfile.create({
//             firstName,
//             lastName,
//             location,
//             currentPosition,
//             phoneNumber,
//             industry,
//             email
//     }).then(
//             res.status(200).json({Status: "Inserted"}));
//     }
}
//     skill: async(req,res)=>{
//         const skillset=req.headers.skillset;
//         const experience=req.headers.experience;
//         UserProfile.create({
//             skillset,
//             experience
//     }).then(
//             res.status(200).json({Status: "Inserted"}));
//     },
//     goal: async(req,res)=>{
//         const goal=req.headers.goal;
//         UserProfile.create({
//             goal
//     }).then(
//             res.status(200).json({Status: "Inserted"}));
//     }
// 