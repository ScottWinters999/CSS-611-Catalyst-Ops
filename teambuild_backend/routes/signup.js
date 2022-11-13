const express = require("express");
const router = express.Router();
const db = require("../util/database");
const auth = require("../middleware/check-auth");
// const auth=require('../midlleware/check-auth')
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const authController=require('../controllers/auth');
// router.get('/signup',authController.postsignup)
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage });
const bodyParser = require("body-parser").json();
const { User, UserMatch } = require("../controllers");
const { UserProfile } = require("../controllers");
const { UserDiscard } = require("../controllers");
const { UserGoal } = require("../controllers");
const { UserProfileView } = require("../controllers");
const { USER } = require("../util/database");
const fileUpload = require("../middleware/file-upload");
router.post("/signup", bodyParser, User.create);
router.post("/login", bodyParser, User.login);
router.post("/forgetpassword", bodyParser, User.forgetpassword);
router.post("/resetpassword", bodyParser, User.resetpassword);

router.get("/userprofile", auth, bodyParser, UserProfile.userprofile);
router.patch("/userupdate", auth, bodyParser, UserProfile.userProfileUpdate);

router.get("/usermatch", auth, bodyParser, UserMatch.userMatch);
router.get("/getpicture", auth, bodyParser, UserProfile.getPic);

router.post(
  "/upload",
  auth,
  fileUpload.single("image"),
  bodyParser,
  UserProfile.upload
);

router.post("/userdiscard", auth, bodyParser, UserDiscard.create);

router.post("/usergoaldelete", bodyParser, UserGoal.truncate);

router.post("/userprofileviewcreate", auth, bodyParser, UserProfileView.create);

router.get(
  "/userprofileview",
  auth,
  bodyParser,
  UserProfileView.getprofileviews
);

router.post("/usergoalmatch", auth, bodyParser, UserGoal.goalcomponentmatch);
router.post(
  "/usergoalmatchremove",
  auth,
  bodyParser,
  UserGoal.goalcomponentmatchremoval
);

// router.get('/skill',auth,bodyParser,UserProfile.skill);
// router.get('/goal',auth,bodyParser,UserProfile.goal);
// router.post('/signup',bodyParser,User.create);
// router.post('/login',bodyParser,User.login);
// router.post('/addchat',bodyParser,Chat.create);
// router.post('/getchat',bodyParser,Chat.getchat);
// router.get('/skill',auth,bodyParser,skill.getSkill);

module.exports = router;
