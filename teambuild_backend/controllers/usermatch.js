const { Sequelize } = require('sequelize');
const {model: { Goal } }=require('../models');
const { USER } = require('../util/database');
const { Op } = require("sequelize");
const {model: { UserProfile } }=require('../models');
const {model: { Skills } }=require('../models');
const {model: { GoalComponent } }=require('../models');
const {model: { UserDiscard } }=require('../models');
const db=require('../models');
const {model: { User } }=require('../models');
const { use } = require('../routes/signup');
const goalcomponent = require('../models/goalcomponent');

module.exports = {
userMatch: async (req, res) =>{
    
    const userId=req.userData.userId;
    // const userId=req.body.userId;
    //const skillset= req.body.goal;
    console.log("type of userId is ",typeof userId);

    if (userId) {
        const locationFromUserProfile = await UserProfile.findOne({
            where:{
                userUserId:userId
            }
        });
        //console.log(locationFromUserProfile.location);
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
        // console.log(skillsets);
        // if(skillsets){
        //     console.log(skillsets.length)
        // }
        if(skillsets.length==0)
            res.status(200).json({"Status":"No Goals to match"});
        else{
        let goalComponentCondition=new Map();


        const goaltocomponent= await Goal.findAll({
            where:{
                userUserId: userId 
            }
        })

        let goalMap=new Map();
        for(let i=0;i<goaltocomponent.length;i++){
            if(goalMap[goaltocomponent[i].dataValues.goalId]==undefined)
            goalMap[goaltocomponent[i].dataValues.goalId]=[];
            goalMap[goaltocomponent[i].dataValues.goalId].push(goaltocomponent[i].dataValues.goal,goaltocomponent[i].dataValues.goalId);
           
        }

       //console.log(skillsets);
        const skills= [];
        const skillstemp=[]
        for( let i=0;i<skillsets.length;i++){
            skills[i]="'"+skillsets[i].goalComponent+"'";
            skillstemp[i]=skillsets[i].goalComponent;
            //implement a list of pairs which stores [goalcomponent , locationPreference]
            if(goalComponentCondition[skillsets[i].goalComponent]==undefined){
                goalComponentCondition[skillsets[i].goalComponent]=[];
            }
            // let temp=[];
            // temp.push(skillsets[i].locationPreference);
            // temp.push(skillsets[i].experienceRequired);
            goalComponentCondition[skillsets[i].goalComponent].push(skillsets[i].locationPreference,skillsets[i].experienceRequired);
        }

        //console.log(goalComponentCondition);

        let goalMapComponent=new Map();
        for(let i=0;i<skillsets.length;i++){
            goalMapComponent[skillsets[i].goalComponent]= goalMap[skillsets[i].dataValues.goalGoalId];
        }

       // console.log(goalMapComponent);

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
       // console.log(userProfileIds);
        for(let i=0;i<userProfileIds.length;i++){
            if(dict[userProfileIds[i].userprofileUserProfileId]==undefined){
                dict[userProfileIds[i].userprofileUserProfileId]=[]
            }
            let list=[];
            //let skill=[];
            let skill= {"SkillMatched":userProfileIds[i].skillset};
            let goalMatched={"goalMatched": goalMapComponent[userProfileIds[i].skillset]}
            let experience={"experience":userProfileIds[i].experience};
            let skillSetId ={"SkillSetId":userProfileIds[i].skillsetId}
            list.push(goalMapComponent[userProfileIds[i].skillset]);
            list.push(userProfileIds[i].experience);
            dict[userProfileIds[i].userprofileUserProfileId].push(skill,goalMatched,experience,skillSetId);
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


        //find the discarded skillsetId


        const userdiscards= await UserDiscard.findAll({
            where:{
                userUserId:userId
            }
        });

        const setOfDiscards=new Set();
        for(let i=0;i<userdiscards.length;i++){
            let temp= userdiscards[i].goalGoalId+""+userdiscards[i].skillSkillsetId+""+userdiscards[i].discardUserId;
            setOfDiscards.add(temp);
        }


       console.log(userdiscards);
        let matchedData=[];
        let discardedData=[];
        let user="user";
        for(let i=0;i<matchedUser.length;i++){

            let temp=[];
            temp={
                "user":matchedUser[i].dataValues,
                "skillset": dict[matchedUser[i].dataValues.userProfileId],
                
            };

           console.log(temp.user);
            let skill= temp.skillset[0]['SkillMatched'];
            //console.log(skill);
            let mapSkill= goalComponentCondition[skill];
            
            //console.log(temp.skillset[1]['goalMatched'][1]);
            let isDiscard = temp.skillset[1]['goalMatched'][1]+""+temp.skillset[3]['SkillSetId']+""+temp.user.userUserId;
            //console.log(mapSkill);
            if(!setOfDiscards.has(isDiscard)){
            console.log(mapSkill[1]," ",temp.skillset[2]['experience']);
                if( mapSkill[1]!=null && mapSkill[1]==temp.skillset[2]['experience']){
                //console.log(mapSkill[0]," ", temp.user.location," ",locationFromUserProfile.location);
                    console.log(isDiscard,"isDicard");
                    if(mapSkill[0]==1 && temp.user.location ==locationFromUserProfile.location)
                        matchedData.push(temp);
                }
                else if(mapSkill[0]!=null && mapSkill[0]!=1)
                     matchedData.push(temp);
                
            
            }
            else{
                discardedData.push(temp);
            }
                

            
        }


        

           //console.log(matchedData);
            res.status(200).json({"matchedData":matchedData, "dicardedData": discardedData});
         

     
    }
    else{
         res.status(400).json({status:"wrong user"});
     }
}
}

