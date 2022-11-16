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
  create: async (req, res) => {

      userId= req.body.userId;
      if(userId){
          const skillset = req.body.skill;
          const experience= req.body.experience;
          const userpositionPositionId= req.body.positionId;

          const skills= await Skills.create({
              skillset,
              experience,
              userpositionPositionId


          }).then((response)=>{
              res.status(200).json({skillId: response.skillsetId , status:"skill created"});
          })
      }else{
          res.status(400).json({status:"wrong user"});
      }
  },

  
}