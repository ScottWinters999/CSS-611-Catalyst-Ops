const bcrypt = require('bcrypt');
//const saltRounds = 10;
module.exports=(sequelize,DataTypes)=>{

  const Skills=sequelize.define('skills',
  {
  //   userId: {
  //     type: DataTypes.INTEGER,
  //     foreignKey:true
  // },
    skillset:{type: DataTypes.STRING, 
      allowNull: true},
    experience:{type: DataTypes.STRING, 
      allowNull: true},
    skillsetId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  },
  );

  return Skills;
};


