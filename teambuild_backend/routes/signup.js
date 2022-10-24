const express=require('express');
const router=express.Router();
const db=require('../util/database');
const auth=require('../middleware/check-auth')
// const auth=require('../midlleware/check-auth')
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const authController=require('../controllers/auth');
// router.get('/signup',authController.postsignup)

const bodyParser=require('body-parser').json();
const { User }=require('../controllers');
const { UserProfile }=require('../controllers');
router.post('/signup',bodyParser,User.create);
router.post('/login',bodyParser,User.login);
router.post('/forgetpassword',bodyParser,User.forgetpassword);
router.post('/resetpassword',bodyParser,User.resetpassword);

router.get('/userprofile',auth,bodyParser,UserProfile.userprofile);
router.get('/search',auth,bodyParser,UserProfile.search);
// router.get('/skill',auth,bodyParser,UserProfile.skill);
// router.get('/goal',auth,bodyParser,UserProfile.goal);
// router.get('/skill',auth,bodyParser,skill.getSkill);

module.exports=router;