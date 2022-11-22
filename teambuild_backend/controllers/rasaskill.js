const jwt = require("jsonwebtoken");
const {
  model: { UserProfile },
} = require("../models");
const {
  model: { Skills },
} = require("../models");
const {
  model: { Goal },
} = require("../models");

const {
  model: { UserPosition },
} = require("../models");

const {
  model: { GoalComponentSkill },
} = require("../models");
const {
  model: { GoalComponent },
} = require("../models");
const goalcomponent = require("../models/goalcomponent");
const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
//var decoded = jwt.verify(token, 'secret_this_should_be_longer');
module.exports = {
  create: async (req, res) => {
    userId = req.body.userId;
    const userpositionPositionId = req.body.positionId;
    if (userId) {
      const skillset = req.body.skill;
      const experience = req.body.experience;

      const skills = await Skills.create({
        skillset,
        experience,
        userpositionPositionId,
      }).then(async (response) => {
        //sent notifications to the matched users who want this skills.
        const positionDetails = await UserPosition.findOne({
          include: {
            model: Skills,
          },
          where: {
            positionId: userpositionPositionId,
          },
        });

        const positionName = positionDetails.positionName;
        const experience = positionDetails.positionExperience;

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
              goalComponent: positionName,
              experienceRequired: {
                [Op.lte]: experience,
              },
            },
          },

          where: {
            userUserId: {
              [Op.not]: userId,
            },
          },
        });

        let matchedDetails = [];
        for (let i = 0; i < goalDetails.length; i++) {
          let goalcomp = goalDetails[i].goalcomponents;

          for (let j = 0; j < goalcomp.length; j++) {
            let compskills = goalcomp[j].goalcomponentskills;
            if (positionDetails.skills.length < compskills.length) {
              continue;
            }
            let findMatch = 1;
            //console.log(82,positionDetails.skills);
            for (let cskills = 0; cskills < compskills.length; cskills++) {
              let matched = 0;
              for (let pos = 0; pos < positionDetails.skills.length; pos++) {
                if (
                  positionDetails.skills[pos].skillset.toLowerCase() ==
                    compskills[cskills].skill.toLowerCase() &&
                  positionDetails.skills[pos].experience >=
                    compskills[cskills].experience
                ) {
                  matched = 1;
                  break;
                }
              }
              if (matched == 0) {
                findMatch = 0;
                break;
              }
            }
            if (findMatch == 1) {
              let match = {};
              //match['posDetails']= positionDetails;
              const matchedUser = await UserProfile.findOne({
                where: {
                  userUserId: goalDetails[i].userUserId,
                },
              });

              match["matchedUser"] = positionDetails.userUserId;
              match["goalName"] = goalDetails[i].goal;
              match["goalEmailId"] = matchedUser.email;
              match["goalcomponent"] = [goalcomp[j]];
              matchedDetails.push({ ...match });
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
        for (let i = 0; i < matchedDetails.length; i++) {
          let goalcomponentMatched =
            matchedDetails[i]["goalcomponent"][0].goalComponent;
          let goalName = matchedDetails[i]["goalName"];
          let email = matchedDetails[i]["goalEmailId"];
          //console.log(123, email);
          transporter.sendMail({
            to: email,
            from: "asheeque123456@gmail.com",
            subject: "match found",
            html: `
                    <p>You found a potential match for the profession ${goalcomponentMatched} for the goal - ${goalName}. Kindly check your new matches for more details.</p>
                    `,
          });
          //   .then(() => {
          //     // res.status(200).json({ status: "Match send" });
          //   })
        }

        res.status(200).json({ status: "Skills inserted and Match send" });
        //res.status(200).json({skillId: response.skillsetId , status:"skill created"});
      });
    } else {
      res.status(400).json({ status: "wrong user" });
    }
  },

  updatepostionskill: async (req, res) => {
    //const userId= req.userData.userId;
    const userId = req.body.userId;
    if (userId) {
      //const positionId= req.body.positionId;
      // const userDetails= await UserProfile.findOne({
      //   where:{
      //     userUserId:userId
      //   }
      // });
      const userpositionPositionId = req.body.positionId;
      const skillset = req.body.skill;
      const experience = req.body.experience;

      Skill.update({
        skillset,
        experience,
      }).then((response) => {
        res.status(200).json({ status: "position updated" });
      });

      // console.log(postionDetails.dataValues);
    } else {
      res.status(400).json({ status: "wrong user" });
    }
  },
};
