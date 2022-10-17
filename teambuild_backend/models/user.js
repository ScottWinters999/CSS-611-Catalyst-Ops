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

  const User=sequelize.define('user',
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey:true
      
  },
    userName:DataTypes.STRING,
    password:DataTypes.STRING,
    email: {
      type: DataTypes.STRING
      
    },
    firstName: DataTypes.STRING,
    lastName:DataTypes.STRING,
    role: DataTypes.STRING
  },
  {
    freezeTableName:true,
    instanceMethods: {
      generateHash(password) {
          return bcrypt.hash(password, bcrypt.genSaltSync(8));
      }
    }
  });

  return User;
};

