const controllers = {};
controllers.User = require("./user");
controllers.UserProfile = require("./userprofile");
controllers.UserMatch = require("./usermatch");
controllers.UserDiscard = require("./userdiscard");
controllers.UserGoal = require("./usergoal");
controllers.UserProfileView = require("./userprofileviews");
controllers.Rasa = require("./rasagoal");
controllers.RasaUser = require("./rasauserprofile");
controllers.RasaPosition = require("./rasapositions");
module.exports = controllers;
