const {
  model: { UserDiscard },
} = require("../models");
const goalcomponent = require("../models/goalcomponent");
const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");

module.exports = {
  create: async (req, res) => {
    const userId = req.userData.userId;

    //userId= req.body.userId;
    if (userId) {
      const userUserId = userId;
      const userprofileUserProfileId = userId;
      const goalGoalId = req.body.goalId;
      //   const skillSkillsetId = req.body.skillSetId;
      const userpositionPositionId = req.body.positionId;
      const discardUserId = req.body.discardUserId;
      const goalcomponentGoalComponentId= req.body.goalcompId;
      UserDiscard.create({
        userUserId,
        userprofileUserProfileId,
        goalGoalId,
        userpositionPositionId,
        discardUserId,
        goalcomponentGoalComponentId
      }).then((response) => {
        res.status(200).json({
          status: "discard table updated",
        });
      });
    } else {
      res.status(400).json({ status: "invalid userId" });
    }
  },
};
