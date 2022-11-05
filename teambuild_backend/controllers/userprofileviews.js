const {
  model: { UserView },
} = require("../models");
const {
  model: { UserProfile },
} = require("../models");
const goalcomponent = require("../models/goalcomponent");
const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");

module.exports = {
  create: async (req, res) => {
    //const userId=req.userData.userId;
    const viewedUserId = req.body.userId;
    if (viewedUserId) {
      // const viewedUserId=userId;
      const userUserId = req.body.userUserId; // the userId of the one who got viewed
      const matchedGoal = req.body.matchedGoal;

      UserView.create({
        viewedUserId,
        userUserId,
        matchedGoal,
      }).then((response) => {
        res.status(200).json({ status: "Userview table updated" });
      });
    } else {
      res.status(200).json({ status: "wrong userID" });
    }
  },

  getprofileviews: async (req, res) => {
    //const userId=req.userData.userId;
    const userId = req.body.userId;
    if (userId) {
      const viewed = await UserView.findAll({
        where: { userUserId: userId },
      });
      const userGoalMap = new Map();
      const userList = [];
      for (let i = 0; i < viewed.length; i++) {
        if (userGoalMap[viewed[i].viewedUserId] == undefined)
          userGoalMap[viewed[i].viewedUserId] = [];
        userGoalMap[viewed[i].viewedUserId].push(viewed[i].matchedGoal);
        userList.push(viewed[i].viewedUserId);
      }

      const userDetails = await UserProfile.findAll({
        where: {
          userUserId: {
            [Op.in]: userList,
          },
        },
      });

      const viewedData = [];
      for (let i = 0; i < userDetails.length; i++) {
        let temp = {
          user: userDetails[i].dataValues,
          goalMapped: userGoalMap[userDetails[i].userUserId],
        };

        viewedData.push(temp);
      }
      console.log(viewedData);

      //   if (viewed) {
      //   }
      //console.log(userDetails);
      res.status(200).json({ viewedData: viewedData });
    } else {
      res.status(400).json({ status: "wrong user" });
    }
  },
};
