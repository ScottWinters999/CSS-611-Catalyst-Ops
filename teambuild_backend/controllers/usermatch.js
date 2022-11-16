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

module.exports = {
  userMatch: async (req, res) => {
    const userId = req.userData.userId;
    // const userId=req.body.userId;
    //const skillset= req.body.goal;
    //console.log("type of userId is ", typeof userId);

    if (userId) {
      //   const locationFromUserProfile = await UserProfile.findOne({
      //     where: {
      //       userUserId: userId,
      //     },
      //   });

      console.log("matchUpdated");

      const userGoal = await Goal.findAll({
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
          },
        },

        where: {
          userUserId: userId,
        },
      });
      //console.log(userGoal[0].dataValues.goalcomponents);
      let finalgoalList = [];
      let finalgoalCompList = [];
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
              userGoal[i].dataValues.goalcomponents[
                j
              ].dataValues.experienceRequired;
            goalcomp["matcheduserId"] =
              userGoal[i].dataValues.goalcomponents[j].dataValues.matchedUserId;
            goalcomp["parentgoalId"] = userGoal[i].dataValues.goalId;
            goalcomp["parentgoalName"] = userGoal[i].dataValues.goal;
            // need to include matched data as well
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

          finalgoalCompList.push([...goalcompList]);
          goals["goalcomponent"] = [...goalcompList];
          finalgoalList.push({ ...goals });
        } // end of goals
      }

      //console.log(138, finalgoalCompList);
      // find skill match

      const userSkill = await UserPosition.findAll({
        include: {
          model: Skills,
          //   required: true,
        },
        where: {
          //   userUserId: userId,
          userUserId: {
            [Op.not]: userId,
          },
        },
      });
      // console.log(152, userSkill[0].dataValues.skills);

      let positionSkill = [];
      if (userSkill) {
        console.log("new update");
        for (let i = 0; i < userSkill.length; i++) {
          let temp = {
            position: userSkill[i].dataValues.positionName,
            positionId: userSkill[i].dataValues.positionId,
            positionExperience: userSkill[i].dataValues.positionExperience,
            userId: userSkill[i].dataValues.userUserId,
            city: userSkill[i].dataValues.city,
            state: userSkill[i].dataValues.state,
            country: userSkill[i].dataValues.country,
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
      // console.log(186, positionSkill);

      const discardList = await UserDiscard.findAll({
        where: {
          userUserId: userId,
        },
      });
      //console.log(188, discardList[0].dataValues);

      let finalMatchList = await compareMatch(
        finalgoalCompList,
        positionSkill,
        discardList
      );
      //console.log(finalMatchList);
      //console.log(196, positionSkill);
      res.status(200).json({
        matchedData: finalMatchList /*, positionSkill: positionSkill */,
      });

      //   res
      //     .status(200)
      //     .json({ matchedData: matchedData, dicardedData: discardedData });
    } else {
      res.status(400).json({ status: "wrong user" });
    }
  },
};

async function compareMatch(goalComponent, positionSkill, discardList) {
  //   console.log("goalcomp", goalComponent);
  //   console.log("posskill", positionSkill);
  let finalList = [];
  for (let i = 0; i < goalComponent.length; i++) {
    let goalcomp = goalComponent[i];
    for (let g = 0; g < goalcomp.length; g++) {
      //console.log(goalcomp[g]);
      for (let j = 0; j < positionSkill.length; j++) {
        let posskill = positionSkill[j];
        //console.log(posskill);
        let locationFlag = true;
        // console.log(225, posskill.position, " ", goalcomp[g].goalcomponent);
        //console.log(posskill.positionExperience, " ", goalcomp[g].experience);
        if (
          goalcomp[g].state != "remote" ||
          goalcomp[g].city != "remote" ||
          goalcomp[g].country != "remote"
        ) {
          let state =
            goalcomp[g].state == null
              ? "true"
              : goalcomp[g].state.toLowerCase() == posskill.state == null? posskill.state :(posskill.state ==null ? posskill.state: posskill.state.toLowerCase());
              //(posskill.state ==null ? posskill.state: posskill.state.toLowerCase())
              //console.log(241, posskill.state==null);
              //!= null ? posskill.state.toLowerCase(): posskill.state
          let city =
            goalcomp[g].city == null
              ? "true"
              : goalcomp[g].city.toLowerCase() == posskill.city.toLowerCase();
          let country =
            goalcomp[g].country == null
              ? "true"
              : goalcomp[g].country.toLowerCase()== posskill.country.toLowerCase();
          if (!state || !city || !country) locationFlag = false;
        }
        // console.log(
        //   248,
        //   posskill.position,
        //   " ",
        //   goalcomp[g].goalcomponent,
        //   " ",
        //   locationFlag
        // );
        if (
          posskill.position == goalcomp[g].goalcomponent &&
          posskill.positionExperience >= goalcomp[g].experience &&
          locationFlag
        ) {
          //console.log(253, posskill.position, " ", goalcomp[g].goalcomponent);
          let matchlength = goalcomp[g].skills.length;
          let matchData = {};
          for (let k = 0; k < posskill.skillset.length; k++) {
            //console.log(posskill.skillset[k]);

            for (
              let gcskill = 0;
              gcskill < goalcomp[g].skills.length;
              gcskill++
            ) {
              //console.log(goalcomp[g].skills[gcskill]);
              if (
                goalcomp[g].skills[gcskill].skill.toLowerCase() ==
                  posskill.skillset[k].skillset.toLowerCase()  &&
                goalcomp[g].skills[gcskill].experience <=
                  posskill.skillset[k].experience
              ) {
                //console.log("match found");
                matchlength--;
                //console.log(matchlength);
              }
            }
            if (matchlength == 0) {
              const userData = await UserProfile.findOne({
                where: {
                  userUserId: posskill.userId,
                },
              });
              let positionDetails = {};
              positionDetails["positionId"] = posskill.positionId;
              matchData["goalData"] = [
                { ...goalcomp[g] },
                // { ...posskill },
                { ...positionDetails },
                userData.dataValues,
              ];
              //   matchData["posskill"] = [{ ...posskill }];
              //   matchData["userdata"] = userData.dataValues;
              finalList.push({ ...matchData });
            }
          }
        }
        //console.log(posskill);
      }
    }
    //console.log(goalcomp);
  }
  //console.log(287, finalList);
  if (discardList.length == 0) {
    //console.log(287, finalList);
    return finalList;
  }
  let finalMatch = [];
  for (let i = 0; i < finalList.length; i++) {
    //console.log(finalList[i]);
    // for(let k=0;k<finalList[i].goal[i].length;k++)
    const goalcompId = finalList[i].goalData[0].goalcomponentId;
    // console.log(322,finalList[i].goalData[1]['positionId']);
    const positionId = finalList[i].goalData[1]["positionId"];
    //console.log(324,finalList[i].goalData[2].userUserId);
    const matchUserId = finalList[i].goalData[2].userUserId;
    const matchGoalId = finalList[i].goalData[0].parentgoalId;
    for (let j = 0; j < discardList.length; j++) {
      const discardUserId = discardList[j].dataValues.discardUserId;
      const discardGoalId = discardList[j].dataValues.goalGoalId;
      const discardPos = discardList[j].dataValues.userpositionPositionId;
      const discardGoalCompId =
        discardList[j].dataValues.goalcomponentGoalComponentId;
      if (
        !(
          discardUserId == matchUserId &&
          discardGoalId == matchGoalId &&
          positionId == discardPos &&
          discardGoalCompId == goalcompId
        )
      ) {
        // console.log(discardUserId, " ", matchUserId);
        // console.log(discardGoalId, " ", matchGoalId);
        // console.log(positionId, " ", discardPos);
        // console.log(discardGoalCompId, " ", goalcompId);
        finalMatch.push(finalList[i]);
        //console.log("305");
      } else {
        console.log("307");
      }
    }
  }

  //console.log(finalList);

  return finalMatch;
}
