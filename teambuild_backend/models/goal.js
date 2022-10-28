const bcrypt = require('bcrypt');
//const saltRounds = 10;
module.exports=(sequelize,DataTypes)=>{

  const Goal=sequelize.define('goal',
  {
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true
  },
    goal:{type: DataTypes.STRING, 
      allowNull: true},
    goalId: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      foreignKey: true,
      goalComponentId:{type: DataTypes.INT, 
        foreignKey: true,
        allowNull: true}
    }
  },
  );

  return Goal;
};