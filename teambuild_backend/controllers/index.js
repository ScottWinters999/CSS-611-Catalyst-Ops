const controllers={};
controllers.User=require('./user');
controllers.Chat=require('./chat');
controllers.UserProfile=require('./userprofile');
controllers.UserMatch=require('./usermatch');
module.exports=controllers;