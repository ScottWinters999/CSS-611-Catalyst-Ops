const {
  model: { Goal, GoalComponent,GoalComponentSkill, UserPosition , Skills},
} = require("../models");
const goalcomponent = require("../models/goalcomponent");
const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");

module.exports = {
  deleteposition: async (req, res) => {
      const userId= req.userData.userId;
      
        if (userId) {
            const positionId = req.body.positionId;
            Skills.destroy({
          where: {
            userpositionPositionId: positionId,
          },
            }) 
         .then(() => {
            UserPosition.destroy({
                where:{
                    positionId: positionId
                }
            })
          })
          .then(()=>{
              res.status(200).json({status:"position Deleted"});
          })
        }else{
            res.status(400).json({status:"wrong user"});
        }
  },

  deletepositionskill: async (req, res) => {
      const userId= req.userData.userId;
      
        if (userId) {
            const skillsetId = req.body.skillId;
            Skills.destroy({
          where: {
            skillsetId: skillsetId,
          },
            }) 
          .then(()=>{
              res.status(200).json({status:"Skill Deleted"});
          })
        }else{
            res.status(400).json({status:"wrong user"});
        }
  }



}