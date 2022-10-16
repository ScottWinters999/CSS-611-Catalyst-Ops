// const UserModel = (sequelize, Sequelize) => {
//   const {INTEGER, VARCHAR, VARCHAR, STRING, VARCHAR} = Sequelize
//   const User = sequelize.define('User', {
//       userId: {type: INTEGER, primaryKey: true, autoIncrement: true},
//       username: {type: VARCHAR, primaryKey: false, allowNull: false},
//       password: STRING,
//       email:VARCHAR,
//       userType: VARCHAR



//   })
//   return User
// }

// module.exports = UserModel
//const {sequelize, DataTypes} = require("sequelize");
const bcrypt = require('bcrypt');
//const saltRounds = 10;
module.exports=(sequelize,DataTypes)=>{

  const UserProfile=sequelize.define('userprofile',
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true
      
  },
    firstName:DataTypes.STRING,
    lastName:DataTypes.STRING,
    location:DataTypes.STRING,
    currentPosition:DataTypes.STRING,
    phoneNumber:DataTypes.INTEGER,
    industry:DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      primaryKey:true
    },
    skillset: DataTypes.STRING,
    experience:DataTypes.STRING,
    goal: DataTypes.STRING
  },
  );

  return UserProfile;
};
