const bcrypt = require('bcrypt');
//const saltRounds = 10;
module.exports=(sequelize,DataTypes)=>{

  const Goal=sequelize.define('goal',
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true
  },
    goal:{type: DataTypes.STRING, 
      allowNull: true},
    goalId: {
      type: DataTypes.INTEGER,
      foreignKey:true
    }
  },
  );

  return Goal;
};