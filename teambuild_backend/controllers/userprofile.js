// const generateAccessToken = require("./generateAccessToken")
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

//var decoded = jwt.verify(token, 'secret_this_should_be_longer');
module.exports = {
  userprofile: async (req, res) => {
    // const jwttoken = req.headers.authorization.split(' ')[1];
    // console.log(jwttoken)
    // const decoded = jwt.verify(jwttoken, 'secret_this_should_be_longer');
    if (req) {
      //const decoded_token = jwt.decode(jwttoken)
      userId = req.userData.userId;
      //userId = req.body.userId

      console.log("16", userId);
      const userExists = await UserProfile.findOne({
        where: { userUserId: userId },
      });

      const userSkill = await UserPosition.findAll({
        include: {
          model: Skills,
          //   required: true,
        },
        where: {
          userUserId: userId,
        },
      });
      console.log(userSkill);

      let positionSkill = [];
      if (userSkill) {
        console.log("new update");
        for (let i = 0; i < userSkill.length; i++) {
          let temp = {
            position: userSkill[i].dataValues.positionName,
            positionExperience: userSkill[i].dataValues.positionExperience,
            skillset: "",
          };

          // positionSkill.push(temp);
          let skilltemp = [];
          let skilllist = [];
          for (let j = 0; j < userSkill[i].dataValues.skills.length; j++) {
            //   skilltemp["skillset"] =
            //     userSkill[i].dataValues.skills[j].dataValues.skillset;
            //   skilltemp["experience"] =
            //     userSkill[i].dataValues.skills[j].dataValues.experience;
            //   skilllist.push(skilltemp);
            skilltemp.push(userSkill[i].dataValues.skills[j].dataValues);
          }
          //console.log("68", skilltemp);
          temp["skillset"] = [...skilltemp];

          positionSkill.push({ ...temp });
        }
      }

      //       console.log("66", positionSkill);
      //       let skillset = [];
      //       for (let i = 0; i < userSkill.length; i++) {
      //         let temp = {
      //           skillset: userSkill[i].dataValues.skillset,
      //           experience: userSkill[i].dataValues.experience,
      //           skillsetId: userSkill[i].dataValues.skillsetId,
      //         };
      //         skillset.push(temp);
      //       }

      //taking the goal details of the user, Goal --> goalcomponent --> goal componentSkill

      const userGoal = await Goal.findAll({
        include: {
          model: GoalComponent,
          //   required: true,
          include: {
            model: GoalComponentSkill,
          },
        },

        where: {
          userUserId: userId,
        },
      });
      let finalgoalList = [];
      if (userGoal) {
        // console.log(
        //   "105",
        //   userGoal[0].dataValues.goalcomponents[0].dataValues
        //     .goalcomponentskills[0].dataValues
        // );
        let goals = {};

        for (let i = 0; i < userGoal.length; i++) {
          goals["goalName"] = userGoal[i].dataValues.goal;
          goals["goalId"] = userGoal[i].dataValues.goalId;
          let goalcomp = {};
          let goalcompList = [];
          for (
            let j = 0;
            j < userGoal[i].dataValues.goalcomponents.length;
            j++
          ) {
            goalcomp["goalcomponent"] =
              userGoal[i].dataValues.goalcomponents[j].dataValues.goalComponent;
            goalcomp["goalcomponentId"] =
              userGoal[i].dataValues.goalcomponents[
                j
              ].dataValues.goalComponentId;
            goalcomp["country"] =
              userGoal[i].dataValues.goalcomponents[j].dataValues.country;
            goalcomp["state"] =
              userGoal[i].dataValues.goalcomponents[j].dataValues.state;
            goalcomp["city"] =
              userGoal[i].dataValues.goalcomponents[j].dataValues.city;
            goalcomp["experience"] =
              userGoal[i].dataValues.goalcomponents[j].dataValues.experience;

            // need to include matched data as well
            const matchedId =
              userGoal[i].dataValues.goalcomponents[j].dataValues.matchedUserId;
            if (matchedId != null) {
              const matchedDetails = await UserProfile.findOne({
                include: {
                  model: UserPosition,
                  where: {
                    positionName:
                      userGoal[i].dataValues.goalcomponents[j].dataValues
                        .goalComponent,
                  },
                },
                where: {
                  userUserId: matchedId,
                },
              });
              if (matchedDetails) goalcomp["matcheduserId"] = matchedDetails;
              
            }
            else goalcomp["matcheduserId"] = null;
               // console.log(154,matchedDetails);

            let goalcompskill = {};
            let goalcompskillList = [];
            for (
              let k = 0;
              k <
              userGoal[i].dataValues.goalcomponents[j].dataValues
                .goalcomponentskills.length;
              k++
            ) {
              goalcompskill["skill"] =
                userGoal[i].dataValues.goalcomponents[
                  j
                ].dataValues.goalcomponentskills[k].dataValues.skill;
              goalcompskill["experience"] =
                userGoal[i].dataValues.goalcomponents[
                  j
                ].dataValues.goalcomponentskills[k].dataValues.experience;
              goalcompskill["goalcomponentskillId"] =
                userGoal[i].dataValues.goalcomponents[
                  j
                ].dataValues.goalcomponentskills[
                  k
                ].dataValues.goalComponentSkillId;

              goalcompskillList.push({ ...goalcompskill });
              //console.log("157", goalcompskill);
            }

            goalcomp["skills"] = [...goalcompskillList];
            goalcompList.push({ ...goalcomp });
          } // end of J loop --> goal component

          goals["goalcomponent"] = [...goalcompList];
          finalgoalList.push({ ...goals });
        } // end of goals
      }

     // console.log("107", finalgoalList[1].goalcomponent[1].matcheduserId.dataValues);

      /*
      
      let goalIds = [];
      let mapGoal = new Map();
      for (let i = 0; i < userGoal.length; i++) {
        mapGoal[userGoal[i].dataValues.goalId] = userGoal[i].dataValues.goal;
        goalIds.push(userGoal[i].dataValues.goalId);
      }
      //console.log(mapGoal);
      const userGoalComponent = await GoalComponent.findAll({
        where: {
          goalGoalId: {
            [Op.in]: goalIds,
          },
        },
      });
      let goalComponent = [];
      let matcheduserids = [];
      console.log(userGoalComponent);
      for (let i = 0; i < userGoalComponent.length; i++) {
        let matchedData = "";
        if (userGoalComponent[i].dataValues.matchedUserId != null) {
          const matchedDetails = await UserProfile.findOne({
            where: {
              userUserId: userGoalComponent[i].dataValues.matchedUserId,
            },
          });
          matchedData = matchedDetails.dataValues.firstName;
          console.log(matchedDetails);
        }
        let temp = {
          goal: mapGoal[userGoalComponent[i].dataValues.goalGoalId],
          goalId: userGoalComponent[i].dataValues.goalGoalId,
          goalComponent: userGoalComponent[i].dataValues.goalComponent,
          goalCompoentId: userGoalComponent[i].dataValues.goalCompoonentId,
          matchedUser: matchedData,
        };

        goalComponent.push(temp);
      }
      */
      //console.log(goalComponent);
      let userObject;
      if (userExists) {
        //console.log(userExists.dataValues)
        userObject = {
          firstName: userExists.dataValues.firstName,
          lastName: userExists.dataValues.lastName,
          email: userExists.dataValues.email,
          country: userExists.dataValues.country
            ? userExists.dataValues.country
            : "",
          state: userExists.dataValues.state ? userExists.dataValues.state : "",
          city: userExists.dataValues.city ? userExists.dataValues.city : "",

          phone: userExists.dataValues.phoneNumber
            ? userExists.dataValues.phoneNumber
            : "",
          currentPosition: userExists.dataValues.currentPosition
            ? userExists.dataValues.currentPosition
            : "",
          industry: userExists.dataValues.industry
            ? userExists.dataValues.industry
            : "",
          isPremiumUser: userExists.dataValues.isPremiumUser
            ? userExists.dataValues.isPremiumUser
            : "",
          position: positionSkill ? positionSkill : "",
          goal: finalgoalList ? finalgoalList : "",
        };

        res.status(200).json({ userData: userObject });
      }
    } else {
      res.status(403).json({ Status: "Sorry Wrong token" });
    }
  },

  userProfileUpdate: async (req, res) => {
    // const jwttoken = req.headers.authorization.split(' ')[1];
    // console.log(jwttoken)
    // const decoded = jwt.verify(jwttoken, 'secret_this_should_be_longer');
    console.log(req["userData"]["userId"], "sss");
    if (req.body) {
      //const decoded_token = jwt.decode(jwttoken)
      // userId = req.userData.userId
      // console.log(userId)
      // const userExists = await UserProfile.findOne({ where: { userId: userId} });
      // const userSkill= await Skills.findAll({where: {userId: userId} });
      // const userGoal = await Goal.findAll({where:{userId: userId}});
      // // console.log(userExists)
      // let userObject;
      console.log("Updating");
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      //const currentPosition = req.body.currentPosition;
      const industry = req.body.industry;
      const phone = req.body.phoneNumber;
      const email = req.body.email;
      //const location = req.body.location;
      const country = req.body.country;
      const state = req.body.state;
      const city = req.body.city;
      const userprofile = await UserProfile.findOne({
        where: { userUserId: req["userData"]["userId"] },
      });
      UserProfile.update(
        {
          firstName: firstName,
          lastName: lastName,
          //currentPosition: currentPosition,
          industry: industry,
          phoneNumber: phone,
          email: email,
          //   location: location,
          country: country,
          state: state,
          city: city,
        },
        {
          where: {
            userUserId: req["userData"]["userId"],
          },
        }
      ).then(() => {
        res.status(200).json({ Status: "Updated" });
      });
    } else {
      res.status(400).json({ Status: "wrong userID" });
    }
  },

  upload: async (req, res) => {
    console.log(req.file);
    // constants.log(req.keys()
    //const image = req.file.buffer.toString('base64');
    const userId = req.userData.userId;
    console.log("246", userId);
    if (!req.file) {
      console.log("No file upload");
    } else {
      console.log(req.file.filename);
      // var imgsrc = '/upload/images/' + req.file.filename
      var imgsrc = req.file.filename;

      console.log(imgsrc);
      if (userId != null && imgsrc != null) {
        console.log("252 entered", userId);

        UserProfile.update(
          {
            profilePicture: imgsrc,
          },
          {
            where: {
              userProfileId: userId,
            },
          }
        ).then(() => {
          res.status(200).json({ status: "Photo Updated successfully" });
        });
      } else {
        res.status(400).json({ status: "Wrong user or image" });
      }

      // var insertData = "INSERT INTO users_file(file_src)VALUES(?)"
      // db.query(insertData, [imgsrc], (err, result) => {
      //     if (err) throw err
      //     console.log("file uploaded")
      // })
    }
  },

  getPic: async (req, res) => {
    console.log(req.file);
    // constants.log(req.keys()
    //const image = req.file.buffer.toString('base64');
    const userId = req.userData.userId;

    if (userId) {
      const userDetails = await UserProfile.findOne({
        where: { userUserId: userId },
      });
      console.log(userDetails.dataValues);
      res.status(200).json({ image: userDetails.dataValues.profilePicture });
    }
  },
};