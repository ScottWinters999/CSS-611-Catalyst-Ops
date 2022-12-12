const { Sequelize } = require("sequelize");
const {
  model: { Goal },
} = require("../models");
const { USER } = require("../util/database");
const { Op } = require("sequelize");
const {
  model: { UserProfile },
} = require("../models");
const {
  model: { Skills },
} = require("../models");
const {
  model: { GoalComponent, GoalComponentSkill },
} = require("../models");
const {
  model: { UserDiscard, UserPosition },
} = require("../models");
const db = require("../models");
const {
  model: { User },
} = require("../models");
const { use } = require("../routes/signup");
const goalcomponent = require("../models/goalcomponent");

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

module.exports = {
  usernotification: async (req, res) => {
      const userId = req.body.userUserId;
      const positionName = req.body.positionName;
      const positionId=req.body.positionId;
      const experience = req.body.experience;
      if(userId){


      const positionDetails = await UserPosition.findOne({
          include:{
              model:Skills
          },
          where:{
              positionId:positionId
          }
      });    


      const goalDetails = await Goal.findAll({
        include: {
          model: GoalComponent,
          //   required: true,
          include: {
            model: GoalComponentSkill,
          },
          where: {
            matchedUserId: {
              [Op.is]: null,
            },
            goalComponent:positionName,
            experienceRequired:{
                [Op.lte]: experience
            }

          },
        },

        where: {
          userUserId:{
              [Op.not]:userId
          },
        },
      });
      //console.log(73,goalDetails[0].goalcomponents);
        let matchedDetails=[];
        for(let i=0;i< goalDetails.length;i++){
            let goalcomp= goalDetails[i].goalcomponents;
            
            for(let j=0;j<goalcomp.length;j++){
                let compskills= goalcomp[j].goalcomponentskills;
                if(positionDetails.skills.length < compskills.length){
                    
                    continue;
                }
                let findMatch=1;
                //console.log(82,positionDetails.skills);
                for( let cskills =0;cskills<compskills.length;cskills++){
                    let matched=0;
                for(let pos=0;pos<positionDetails.skills.length;pos++){
                    
                    
                        if(positionDetails.skills[pos].skillset.toLowerCase() == compskills[cskills].skill.toLowerCase() && positionDetails.skills[pos].experience >= compskills[cskills].experience){
                            matched=1;
                            break;
                        }
                    }
                    if(matched==0){
                        findMatch=0;
                        break;
                    }
                }
                if(findMatch==1){
                    let match={};
                    //match['posDetails']= positionDetails;
                    const matchedUser = await UserProfile.findOne({
                        where:{
                            userUserId:goalDetails[i].userUserId
                        }
                    });

                    match['matchedUser']= positionDetails.userUserId;
                    match['goalName'] = goalDetails[i].goal;
                    match['goalEmailId'] =  matchedUser.email;
                    match['goalcomponent']=[goalcomp[j]];
                    matchedDetails.push({...match});
                }
            }
        }

        const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    let transporter = nodemailer.createTransport(
      sendgridTransport({
        auth: {
          api_key: SENDGRID_API_KEY,
        },
      })
    );
        for(let i=0;i<matchedDetails.length;i++){

            let goalcomponentMatched=matchedDetails[i]['goalcomponent'][0].goalComponent;
            let goalName =matchedDetails[i]['goalName'];
            let email = matchedDetails[i]['goalEmailId'];
            console.log(123, email);
            transporter
          .sendMail({
            to: email,
            from: "stwintersphd@gmail.com",
            subject: "match found",
            html: `
                    <p>You found a potential match for the profession ${goalcomponentMatched} for the goal - ${goalName}. Kindly check your new matches for more details.</p>
                    `,
          })
        //   .then(() => {
        //     // res.status(200).json({ status: "Match send" });
        //   })
          
        }

        res.status(200).json({ status: "Match send" });







      //res.status(200).json({matchedDetails:matchedDetails});
  }else{
      res.status(400).json({status:"wrong user"});
  }
}
}