const bcrypt = require('bcrypt');
//const saltRounds = 10;
module.exports=(sequelize,DataTypes)=>{

  const GoalComponent=sequelize.define('goalcomponent',
  {
  //   userId: {
  //     type: DataTypes.INTEGER,
  //     foreignKey: true
  // },
    goalComponent:{type: DataTypes.STRING, 
      allowNull: true},
    goalCompoonentId: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true
    },
    matchedUserId:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    locationPreference:{
        type: DataTypes.INTEGER,
        allowNull:true
    },
    experienceRequired:{
        type:DataTypes.INTEGER,
        allowNull:true
    }
  },
  );

  return GoalComponent;
};