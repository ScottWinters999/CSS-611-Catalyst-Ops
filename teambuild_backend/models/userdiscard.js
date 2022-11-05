const bcrypt = require("bcrypt");
//const saltRounds = 10;
module.exports = (sequelize, DataTypes) => {
  const UserDiscard = sequelize.define("userdiscard", {
    discardId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    discardUserId: {
      type: DataTypes.INTEGER,
    },
  });

  return UserDiscard;
};
