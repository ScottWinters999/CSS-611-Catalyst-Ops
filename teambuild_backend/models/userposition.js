const bcrypt = require("bcrypt");
//const saltRounds = 10;
module.exports = (sequelize, DataTypes) => {
  const UserPosition = sequelize.define("userposition", {
    //   userId: {
    //     type: DataTypes.INTEGER,
    //     foreignKey:true
    // },
    positionExperience: { type: DataTypes.STRING, allowNull: true },
    state: { type: DataTypes.STRING, allowNull: true },
    country: { type: DataTypes.STRING, allowNull: true },
    city: { type: DataTypes.STRING, allowNull: true },

    positionName: { type: DataTypes.STRING, allowNull: true },
    positionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });

  return UserPosition;
};
