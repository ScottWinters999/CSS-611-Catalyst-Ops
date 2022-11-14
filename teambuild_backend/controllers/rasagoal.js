const {
  model: { Goal, GoalComponentSkill, GoalComponent },
} = require("../models");
const goalcomponent = require("../models/goalcomponent");
const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");

module.exports = {
  creategoal: async (req, res) => {
    // const userId = req.userData.userId;
    const userId= req.body.userId;
    if (userId) {
      //const goalId = req.body.goalId;
      const userprofileUserProfileId = userId;
      const goalName = req.body.goal;
      Goal.create(
        {
          goal: goalName,
          userUserId: userId,
          userprofileUserProfileId,
        }
        // {
        //   where: {
        //     userUserId: userId,
        //   },
        // }
      ).then((response) => {
        //console.log(response.goalId);
        res
          .status(200)
          .json({ goalId: response.goalId, status: "goal created" });
      });
    } else {
      res.status(400).json({ status: "wrong userId" });
    }
  },
  updategoal: async (req, res) => {
    // const userId = req.userData.userId;
    const userId= req.body.userId;
    if (userId) {
      const goalId = req.body.goalId;
      const goalName = req.body.goalName;
      Goal.update(
        {
          goal: goalName,
        },
        {
          where: {
            goalId: goalId,
          },
        }
      ).then(() => {
        res.status(200).json({ status: "goal name updated" });
      });
    } else {
      res.status(400).json({ status: "wrong userId" });
    }
  },

  creategoalcomponent: async (req, res) => {
    // const userId = req.userData.userId;
    const userId= req.body.userId;
    if (userId) {
      //const goalComponentId = req.body.goalComponentId;
      const goalGoalId = req.body.goalId;
      const experienceRequired = req.body.experience;
      const goalComponent = req.body.goalComponent;
      const country = req.body.country;
      const state = req.body.state;
      const city = req.body.city;
      GoalComponent.create(
        {
          goalComponent,
          experienceRequired,
          country,
          state,
          city,
          goalGoalId,
        }
        // {
        //   where: {
        //     goalComponentId: goalComponentId,
        //   },
        // }
      ).then((response) => {
        //console.log(response);
        res.status(200).json({
          goalcomponentId: response.goalComponentId,
          status: "goal component created",
        });
      });
    } else {
      res.status(200).json({ status: "wrong user" });
    }
  },

  updategoalcomponent: async (req, res) => {
    // const userId = req.userData.userId;
    const userId= req.body.userId;
    if (userId) {
      const goalComponentId = req.body.goalComponentId;
      const experienceRequired = req.body.experience;
      const goalComponent = req.body.goalComponent;
      const country = req.body.country;
      const state = req.body.state;
      const city = req.body.city;
      GoalComponent.update(
        {
          goalComponent,
          experienceRequired,
          country,
          state,
          city,
        },
        {
          where: {
            goalComponentId: goalComponentId,
          },
        }
      ).then(() => {
        res.status(200).json({ status: "goal component updated" });
      });
    } else {
      res.status(200).json({ status: "wrong user" });
    }
  },

  creategoalcomponentskill: async (req, res) => {
    // const userId = req.userData.userId;
    const userId= req.body.userId;
    if (userId) {
      //const goalComponentSkillId = req.body.skillId;
      const goalcomponentGoalComponentId = req.body.goalComponentId;
      const experience = req.body.experience;
      const skill = req.body.skill;

      GoalComponentSkill.create(
        {
          experience,
          skill,
          goalcomponentGoalComponentId,
        }
        // {
        //   where: {
        //     goalComponentSkillId: goalComponentSkillId,
        //   },
        // }
      ).then((response) => {
        //console.log(response);
        res.status(200).json({
          skillId: response.goalComponentSkillId,
          status: "goal componentskills created",
        });
      });
    } else {
      res.status(200).json({ status: "wrong user" });
    }
  },
  updategoalcomponentskill: async (req, res) => {
    // const userId = req.userData.userId;
    const userId= req.body.userId;
    if (userId) {
      const goalComponentSkillId = req.body.skillId;
      const experience = req.body.experience;
      const skill = req.body.skill;

      GoalComponentSkill.update(
        {
          experience,
          skill,
        },
        {
          where: {
            goalComponentSkillId: goalComponentSkillId,
          },
        }
      ).then(() => {
        res.status(200).json({ status: "goal componentskills updated" });
      });
    } else {
      res.status(200).json({ status: "wrong user" });
    }
  },

  getallgoalcomponenet: async (req, res) => {
    // const userId = req.userData.userId;
    const userId= req.body.userId;
    if (userId) {
      //const goalId = req.body.goalId;
      //const userprofileUserProfileId = userId;
      const goalId = req.body.goalId;
      const goalDetails = await Goal.findOne({
        include:{
          model:GoalComponent
        },
        where:{
          goalId:goalId
        }
      })
      let goal={};
      if(goalDetails){
        goal['goal']=goalDetails.dataValues.goal;
        goal['goalId']=goalDetails.dataValues.goalId;
        let goalComp=[];
        for(let i=0;i<goalDetails.dataValues.goalcomponents.length;i++){
          let components= goalDetails.dataValues.goalcomponents[i].dataValues;
          goalComp.push(components);
        }
        goal['components']= [...goalComp];

      }
     // console.log(goal);
      res.status(200).json({goalDetails:goal});
    } else {
      res.status(400).json({ status: "wrong userId" });
    }
  },
};
