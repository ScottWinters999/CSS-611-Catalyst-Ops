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
    const userId = req.body.userId;
    if (userId) {
      const positionId = req.body.positionId;
      const postionDetails = await UserPosition.findOne({
        include: {
          model: Skills,
        },
        where: {
          positionId: positionId,
        },
      });

      // console.log(postionDetails.dataValues);
      res.status(200).json({ postionDetails: postionDetails });
    } else {
      res.status(400).json({ status: "wrong user" });
    }
  },

  getpostiondetailsofuser: async (req, res) => {
    //const userId= req.userData.userId;
    const userId = req.body.userId;
    if (userId) {
      // const positionId = req.body.positionId;
      const postionDetails = await UserPosition.findAll({
       
        where: {
          userUserId: userId,
        },
      });

      // console.log(postionDetails.dataValues);
      res.status(200).json({ postionDetails: postionDetails });
    } else {
      res.status(400).json({ status: "wrong user" });
    }
  },

  createpostion: async (req, res) => {
    //const userId= req.userData.userId;
    const userId = req.body.userId;
    if (userId) {
      //const positionId= req.body.positionId;
      const userDetails = await UserProfile.findOne({
        where: {
          userUserId: userId,
        },
      });
      const positionName = req.body.positionName;
      const positionExperience = req.body.experience;
      const country = userDetails.country;
      const state = userDetails.state;
      const city = userDetails.city;
      const userUserId = userId;
      const userprofileUserProfileId = userDetails.userProfileId;

      const positionDetails = await UserPosition.create({
        country,
        state,
        city,
        positionExperience,
        positionName,
        userprofileUserProfileId,
        userUserId,
      }).then((response) => {
        res
          .status(200)
          .json({ positonId: response.positionId, status: "positoin created" });
      });

      // console.log(postionDetails.dataValues);
    } else {
      res.status(400).json({ status: "wrong user" });
    }
  },

  updatepostion: async (req, res) => {
      //const userId= req.userData.userId;
      const userId= req.body.userId;
      if(userId){
          //const positionId= req.body.positionId;
          // const userDetails= await UserProfile.findOne({
          //   where:{
          //     userUserId:userId
          //   }
          // });
          const positionName= req.body.positionName;
          const positionExperience= req.body.experience;
          const country= req.body.country;
          const state= req.body.state;
          const city= req.body.city;
          const userUserId= userId;
          const userprofileUserProfileId= userId;
          const positionId= req.body.positionId;

          UserPosition.update({
            country,
            state,
            city,
            positionExperience,
            positionName,
            userprofileUserProfileId,
            userUserId


          },
          {
          where: {
            positionId: positionId,
          },
        }).then((response)=>{
              res.status(200).json({status:"positoin updated"});
          })
        
       // console.log(postionDetails.dataValues);
       

      }else{
          res.status(400).json({status:"wrong user"});
      }
  },
};
