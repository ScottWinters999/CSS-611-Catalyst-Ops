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
  getpostiondetails: async (req, res) => {
      //const userId= req.userData.userId;
      const userId= req.body.userId;
      if(userId){
          const positionId= req.body.positionId;
          const postionDetails= await UserPosition.findOne({
              include:{
                  model:Skills
              },
              where:{
                  positionId:positionId
              }
          })
        
       // console.log(postionDetails.dataValues);
        res.status(200).json({postionDetails:postionDetails});

      }else{
          res.status(400).json({status:"wrong user"});
      }
  }
}