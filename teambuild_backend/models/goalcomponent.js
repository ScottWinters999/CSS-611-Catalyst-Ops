const bcrypt = require("bcrypt");
//const saltRounds = 10;
module.exports = (sequelize, DataTypes) => {
  const GoalComponent = sequelize.define("goalcomponent", {
    //   userId: {
    //     type: DataTypes.INTEGER,
    //     foreignKey: true
    // },
    goalComponent: { type: DataTypes.STRING, allowNull: true },
    goalComponentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    matchedUserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: { type: DataTypes.STRING, allowNull: true },

    experienceRequired: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  return GoalComponent;
};
