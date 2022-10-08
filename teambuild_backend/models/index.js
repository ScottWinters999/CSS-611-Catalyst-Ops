const dbconfig=require('../util/database');
const Sequelize=require('sequelize');

const sequelize=new Sequelize(dbconfig.DATABSE,dbconfig.USER,dbconfig.PASSWORD,{
    host:dbconfig.HOST,
    dialect:dbconfig.DIALECT
});


const db={};
db.sequelize=sequelize;
db.model={};
db.model.User=require('./user')(sequelize,Sequelize.DataTypes);


module.exports=db;

