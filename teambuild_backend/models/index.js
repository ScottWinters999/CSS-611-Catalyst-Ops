const dbconfig = require("../util/database");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  dbconfig.DATABASE,
  dbconfig.USER,
  dbconfig.PASSWORD,
  {
    host: dbconfig.HOST,
    // port:dbconfig.PORT,
    dialect: dbconfig.DIALECT,
    // path:dbconfig.PATH,

    // pool: {
    //     handleDisconnects: true,
    //     max: 13,
    //     min: 1,
    //     idle: 10000,
    //     acquire: 100000 // i also tried 50000
    // },
    dialectOptions: {
      connectTimeout: 1000000,
    },
  }
);

const db = {};
db.sequelize = sequelize;
db.model = {};
db.model.User = require("./user")(sequelize, Sequelize.DataTypes);
db.model.UserProfile = require("./userprofile")(sequelize, Sequelize.DataTypes);
db.model.Skills = require("./skill")(sequelize, Sequelize.DataTypes);
db.model.Goal = require("./goal")(sequelize, Sequelize.DataTypes);

// db.model.Chat = require("./chat")(sequelize, Sequelize.DataTypes);

db.model.GoalComponent = require("./goalcomponent")(
  sequelize,
  Sequelize.DataTypes
);
db.model.UserDiscard = require("./userdiscard")(sequelize, Sequelize.DataTypes);
db.model.UserView = require("./userview")(sequelize, Sequelize.DataTypes);

db.model.User.hasMany(db.model.Goal);
db.model.User.hasMany(db.model.Skills);
db.model.User.hasOne(db.model.UserProfile);
db.model.UserProfile.hasMany(db.model.Skills);
db.model.UserProfile.hasMany(db.model.Goal);
db.model.Goal.hasMany(db.model.GoalComponent);

db.model.User.hasMany(db.model.UserDiscard);
db.model.Goal.hasMany(db.model.UserDiscard);
db.model.Skills.hasMany(db.model.UserDiscard);

db.model.User.hasMany(db.model.UserView);

// db.model.User.hasOne(db.model.Skills,{
//   foreignKey:'userId'
//   // as: 'skills'
// })

// db.model.User.hasOne(db.model.UserProfile,{
//   foreignKey:'userId'
//   // as: 'skills'
// })

// db.model.Skills.hasOne(db.model.UserProfile,{
//   foreignKey:'userId'
// })

// db.model.UserProfile.hasOne(db.model.Skills,{
//   foreignKey:'userId'
// })

// db.model.Skills.belongsTo(db.model.UserProfile,{
//   foreignKey:'userId',
//   as:'userprofile'
// })
module.exports = db;
