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
//const saltRounds = 10;
module.exports=(sequelize,DataTypes)=>{

    const UserProfile=sequelize.define('userprofile',
    {
      userId: {
        type: DataTypes.INTEGER,
        foreignKey: true
    },
      firstName:DataTypes.STRING,
      lastName:DataTypes.STRING,
      location:{type: DataTypes.STRING, 
        allowNull: true},
      currentPosition:{type: DataTypes.STRING, 
        allowNull: true},
      phoneNumber:{type: DataTypes.INTEGER, 
        allowNull: true},
      industry: {type: DataTypes.STRING, 
        allowNull: true},
      isPremiumUser: {type: DataTypes.BOOLEAN, 
          allowNull: true},
      email: {
        type: DataTypes.STRING
        
      },
      userProfileId: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    }
    },
    );
  
    return UserProfile;
  };