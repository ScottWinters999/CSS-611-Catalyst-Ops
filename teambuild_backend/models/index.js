const dbconfig=require('../util/database');
const Sequelize=require('sequelize');

const sequelize=new Sequelize(dbconfig.DATABASE,dbconfig.USER,dbconfig.PASSWORD,
        {
    host:dbconfig.HOST,
    // port:dbconfig.PORT,
    dialect:dbconfig.DIALECT,
    // path:dbconfig.PATH,
    
    // pool: {
    //     handleDisconnects: true,
    //     max: 13,
    //     min: 1, 
    //     idle: 10000, 
    //     acquire: 100000 // i also tried 50000
    // },
    dialectOptions: {
        connectTimeout: 1000000
      }
        });


const db={};
db.sequelize=sequelize;
db.model={};
db.model.User=require('./user')(sequelize,Sequelize.DataTypes);
db.model.UserProfile=require('./userprofile')(sequelize,Sequelize.DataTypes);
db.model.Skills=require('./skill')(sequelize,Sequelize.DataTypes);
db.model.Goal=require('./goal')(sequelize,Sequelize.DataTypes);
module.exports=db;
