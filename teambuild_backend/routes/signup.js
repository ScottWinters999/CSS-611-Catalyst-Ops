const express=require('express');
const router=express.Router();
const db=require('../util/database');
const auth=require('../middleware/check-auth')
// const auth=require('../midlleware/check-auth')
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const authController=require('../controllers/auth');
// router.get('/signup',authController.postsignup)
const { Chat }=require('../controllers');
const { User }=require('../controllers');
// const { UserProfile }=require('../controllers');
const { UserProfile }=require('../controllers');
// const userprofile = require('../models/userprofile');

const bodyParser=require('body-parser').json();

router.post('/signup',bodyParser,User.create);
router.post('/login',bodyParser,User.login);

router.post('/forgetpassword',bodyParser,User.forgetpassword);
router.post('/resetpassword',bodyParser,User.resetpassword);

router.get('/userprofile',auth,bodyParser,UserProfile.userprofile);
router.put('/userupdate',auth,bodyParser,UserProfile.userProfileUpdate)
// router.get('/skill',auth,bodyParser,UserProfile.skill);
// router.get('/goal',auth,bodyParser,UserProfile.goal);
// router.post('/signup',bodyParser,User.create);
// router.post('/login',bodyParser,User.login);
router.post('/addchat',bodyParser,Chat.create);
router.post('/getchat',bodyParser,Chat.getchat);
// router.get('/skill',auth,bodyParser,skill.getSkill);

module.exports=router;