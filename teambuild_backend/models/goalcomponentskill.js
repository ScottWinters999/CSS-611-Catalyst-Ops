const bcrypt = require("bcrypt");
//const saltRounds = 10;
module.exports = (sequelize, DataTypes) => {
  const GoalComponentSkill = sequelize.define("goalcomponentskill", {
    //   userId: {
    //     type: DataTypes.INTEGER,
    //     foreignKey: true
    // },

    goalComponentSkillId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    skill: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    experience: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return GoalComponentSkill;
};
