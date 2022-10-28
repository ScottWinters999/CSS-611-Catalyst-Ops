const bcrypt = require('bcrypt');
//const saltRounds = 10;
module.exports=(sequelize,DataTypes)=>{

  const GoalComponents=sequelize.define('goal',
  {
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true
  },
    goalId:{type: DataTypes.INTEGER,
        foreignKey: true},
    userProfileId:{type: DataTypes.INTEGER,
        foreignKey: true},
    goalComponentId:{type: DataTypes.INT, 
        primaryKey: true,
        allowNull: true},
    goalComponents:{type: DataTypes.STRING, 
        allowNull: true}
  },
  );

  return GoalComponents;
};