const bcrypt = require('bcrypt');
//const saltRounds = 10;
module.exports=(sequelize,DataTypes)=>{

  const UserView=sequelize.define('userview',
  {
    viewId: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true
    },

    matchedGoal:{
        type:DataTypes.STRING
    },

    viewedUserId:{
        type:DataTypes.INTEGER
    }

  }
  );
  return UserView;
}