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
  getuserprofile: async (req, res) => {
      const userId= req.userData.userId;
      if(userId){
          const userDetails= await UserProfile.findOne({
              where:{
                  userUserId:userId
              },
            });
        
        //console.log(userDetails);
        res.status(200).json({userDetails:userDetails});

      }else{
          res.status(400).json({status:"wrong user"});
      }
  },

userProfileUpdate: async (req, res) => {
    // const jwttoken = req.headers.authorization.split(' ')[1];
    // console.log(jwttoken)
    // const decoded = jwt.verify(jwttoken, 'secret_this_should_be_longer');
    //console.log(req["userData"]["userId"], "sss");
    if (req.body.userId) {
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
      const userId= req.body.userId;
    //   const userprofile = await UserProfile.findOne({
    //     where: { userUserId: userId},
    //   });
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
            userUserId: userId,
          },
        }
      ).then(() => {
        res.status(200).json({ Status: "userprofile details Updated" });
      });
    } else {
      res.status(400).json({ Status: "wrong userID" });
    }
  },
}