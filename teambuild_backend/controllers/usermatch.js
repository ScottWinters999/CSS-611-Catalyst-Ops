const { Sequelize } = require('sequelize');
const {model: { Goal } }=require('../models');
const { USER } = require('../util/database');
const { Op } = require("sequelize");
const {model: { UserProfile } }=require('../models');
const {model: { Skills } }=require('../models');
const {model: { GoalComponent } }=require('../models');
const db=require('../models');
const {model: { User } }=require('../models');
const { use } = require('../routes/signup');

module.exports = {
userMatch: async (req, res) =>{
    
    // const userId=req.userData.userId;
    const userId=req.body.userId;
    //const skillset= req.body.goal;
    console.log("type of userId is ",typeof userId);

    if (userId) {
        const skillsets= await GoalComponent.findAll({
           
            where:{
                goalGoalId:{
                    [Op.in]:Sequelize.literal(`(
                        SELECT goalId
                        FROM goals 
                        WHERE
                            goals.userUserId = ${userId}
                           
                    )`)
                }
            }
        })
        
        const skills= [];
        const skillstemp=[]
        for( let i=0;i<skillsets.length;i++){
            skills[i]="'"+skillsets[i].goalComponent+"'";
            skillstemp[i]=skillsets[i].goalComponent;
        }

        const userProfileIds = await Skills.findAll({
            where:{
                skillset:{
                    [Op.in]:skillstemp
                },
                userUserId:{
                    [Op.not]:userId
                }
            }
        })
        var ids    = skills.join(',');
        
        let dict={}

        for(let i=0;i<userProfileIds.length;i++){
            if(dict[userProfileIds[i].userprofileUserProfileId]==undefined){
                dict[userProfileIds[i].userprofileUserProfileId]=[]
            }
            dict[userProfileIds[i].userprofileUserProfileId].push(userProfileIds[i].skillset);
        }
        const validuserIds=[]
        for(let i=0;i<userProfileIds.length;i++){
            validuserIds[i]=userProfileIds[i].userprofileUserProfileId;
        }
        const matchedUser= await UserProfile.findAll({
         
            where:{
                userProfileId:{
                    // [Op.in]: validuserIds
                    [Op.in]:Sequelize.literal(`(
                        SELECT userprofileUserProfileId
                        FROM skills 
                        WHERE skills.skillset in  (${ids})           
                    )`)
                },
                // bind:{skills},
                userUserId:{
                    [Op.not]: userId
                }
            }
        })


        let matchedData=[];
        let user="user";
        for(let i=0;i<matchedUser.length;i++){
            let temp=[];
            temp={
                "user":matchedUser[i].dataValues,
                "skillset": dict[matchedUser[i].dataValues.userProfileId]
            };
            matchedData.push(temp);
                

            
        }


        

           console.log(matchedData);
            res.status(200).json({matchedData});
         

     
    }
    else{
         res.status(400).json({status:"wrong user"});
     }
}
}

