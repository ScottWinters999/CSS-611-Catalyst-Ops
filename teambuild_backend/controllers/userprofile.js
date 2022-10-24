// const generateAccessToken = require("./generateAccessToken")
const jwt = require("jsonwebtoken");
const {model: { UserProfile } }=require('../models');
const {model: { Skills } }=require('../models');
const {model: { Goal } }=require('../models');
//var decoded = jwt.verify(token, 'secret_this_should_be_longer');
module.exports={
    userprofile: async(req,res)=>{
        // const jwttoken = req.headers.authorization.split(' ')[1];
        // console.log(jwttoken)
        // const decoded = jwt.verify(jwttoken, 'secret_this_should_be_longer');
        if (req.userData.userId) {
                //const decoded_token = jwt.decode(jwttoken)
                userId = req.userData.userId
                console.log(userId)
                const userExists = await UserProfile.findOne({ where: { userId: userId} });
                const userSkill= await Skills.findAll({where: {userId: userId} });
                const userGoal = await Goal.findAll({where:{userId: userId}});
                // console.log(userExists)
                let userObject;
                if(userExists){
                        console.log(userExists.dataValues)
                        userObject = {
                                'firstName':userExists.dataValues.firstName,
                                'lastName':userExists.dataValues.lastName,
                                'email':userExists.dataValues.email,
                                'location': userExists.dataValues.location,
                                'phone' : userExists.dataValues.phoneNumber,
                                'currentPosition' : userExists.dataValues.currentPosition,
                                'industry' : userExists.dataValues.industry,
                                'isPremiumUser' : userExists.dataValues.isPremiumUser,
                                'skillset' : userSkill,
                                'goal' : userGoal
                        }
                        
                        res.status(200).json({userData:userObject})

                }
        } else {
                res.status(403).json({Status:'Sorry Wrong token'});
        }
    },

    userProfileUpdate: async(req,res)=>{
        // const jwttoken = req.headers.authorization.split(' ')[1];
        // console.log(jwttoken)
        // const decoded = jwt.verify(jwttoken, 'secret_this_should_be_longer');
        if (req.body.userId) {
                //const decoded_token = jwt.decode(jwttoken)
                // userId = req.userData.userId
                // console.log(userId)
                // const userExists = await UserProfile.findOne({ where: { userId: userId} });
                // const userSkill= await Skills.findAll({where: {userId: userId} });
                // const userGoal = await Goal.findAll({where:{userId: userId}});
                // // console.log(userExists)
                // let userObject;
                console.log("Updating")
                const firstName= req.body.firstName;
                const lastName = req.body.lastName;
                const currentPosition= req.body.currentPosition;
                const industry= req.body.industry;
                const phone =req.body.phoneNumber;
                const email= req.body.email;
                const location= req.body.location;
                const userprofile=  await UserProfile.findOne({ where :{userId:req.body.userId}}); 
                UserProfile.update({
                        firstName: firstName,
                        lastName:lastName,
                        currentPosition:currentPosition,
                        industry:industry,
                        phoneNumber:phone,
                        email:email,
                        location: location
                        
                      },{
                        where: {
                                userId: req.body.userId,
                              },

                      }).then(()=>{
                        res.status(200).json({Status: "Updated"})
                      });

                
        }else{
                res.status(400).json({Status:"wrong userID"});
        }
    }


}