// const generateAccessToken = require("./generateAccessToken")
const jwt = require("jsonwebtoken");
const {model: { UserProfile } }=require('../models');
const {model: { Skills } }=require('../models');
const {model: { Goal } }=require('../models');
const {model: { GoalComponent } }=require('../models');
const goalcomponent = require("../models/goalcomponent");
const { Sequelize } = require('sequelize');
const { Op } = require("sequelize");


//var decoded = jwt.verify(token, 'secret_this_should_be_longer');
module.exports={
    userprofile: async(req,res)=>{
        // const jwttoken = req.headers.authorization.split(' ')[1];
        // console.log(jwttoken)
        // const decoded = jwt.verify(jwttoken, 'secret_this_should_be_longer');
        if (req) {
                //const decoded_token = jwt.decode(jwttoken)
                userId = req.userData.userId
                //userId = req.body.userId

                console.log("16",userId)
                const userExists = await UserProfile.findOne({ where: { userUserId: userId} });
                const userSkill= await Skills.findAll({where: {userUserId: userId} });
                let skillset=[];
                for(let i=0;i<userSkill.length;i++){
                        let temp= {
                                "skillset": userSkill[i].dataValues.skillset,
                                "experience": userSkill[i].dataValues.experience
                        }
                        skillset.push(temp);
                }
                const userGoal = await Goal.findAll({where:{userUserId: userId}});

                let goalIds=[];
                let mapGoal= new Map();
                for(let i=0;i<userGoal.length;i++){
                        mapGoal[userGoal[i].dataValues.goalId]=userGoal[i].dataValues.goal;
                        goalIds.push(userGoal[i].dataValues.goalId);
                }
                //console.log(mapGoal);
                const userGoalComponent= await GoalComponent.findAll(
                        {
                                where:{
                                    goalGoalId:{
                                        [Op.in]:goalIds
                                    }
                                }
                        }
                        );
                let goalComponent=[];
                //console.log(userGoalComponent);
                for(let i=0;i<userGoalComponent.length;i++){
                        let temp={
                                "goal": mapGoal[userGoalComponent[i].dataValues.goalGoalId],
                                "goalComponent":userGoalComponent[i].dataValues.goalComponent,
                                "matchedUser":''
                        }

                        goalComponent.push(temp);
                }
                //console.log(goalComponent);
                let userObject;
                if(userExists){
                        //console.log(userExists.dataValues)
                        userObject = {
                                'firstName':userExists.dataValues.firstName,
                                'lastName':userExists.dataValues.lastName,
                                'email':userExists.dataValues.email,
                                'location': userExists.dataValues.location?userExists.dataValues.location:'',
                                'phone' : userExists.dataValues.phoneNumber?userExists.dataValues.phoneNumber:'',
                                'currentPosition' : userExists.dataValues.currentPosition?userExists.dataValues.currentPosition:'',
                                'industry' : userExists.dataValues.industry?userExists.dataValues.industry:'',
                                'isPremiumUser' : userExists.dataValues.isPremiumUser?userExists.dataValues.isPremiumUser:'',
                                'skillset' : skillset,
                                'goal' : goalComponent
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
        console.log(req['userData']['userId'])
        if (req.body) {
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
                const userprofile=  await UserProfile.findOne({ where :{userUserId:req.body.userId}}); 
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
                                userUserId: req.body.userId,
                              },

                      }).then(()=>{
                        res.status(200).json({Status: "Updated"})
                      });

                
        }else{
                res.status(400).json({Status:"wrong userID"});
        }
    }


}