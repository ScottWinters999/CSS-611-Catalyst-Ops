JsonField = require('sequelize-json');
module.exports=(sequelize,DataTypes)=>{

    const Chat=sequelize.define('chat',
    {
      conversationId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true
        
        
        
    },
      userId: {
        type: DataTypes.INTEGER,
        foreignKey: true
        
    },
    
    jsonField: JsonField(sequelize, 'Chat', 'jsonField')
    },
    );
  
    return Chat;
  };