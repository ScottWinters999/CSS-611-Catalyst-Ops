const express=require('express');
const router=express.Router();
const db=require('../util/database');
<<<<<<< HEAD
const auth=require('../middleware/check-auth')
=======
// const auth=require('../midlleware/check-auth')
>>>>>>> 1311d723acd8069d57612016fab27b058b3675aa
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const authController=require('../controllers/auth');
// router.get('/signup',authController.postsignup);

const bodyParser=require('body-parser').json();
const { User }=require('../controllers');
const { UserProfile }=require('../controllers');
router.post('/signup',bodyParser,User.create);
router.post('/login',bodyParser,User.login);
<<<<<<< HEAD
router.get('/userprofile',auth,bodyParser,UserProfile.userprofile);
router.get('/skill',auth,bodyParser,UserProfile.skill);
router.get('/goal',auth,bodyParser,UserProfile.goal);
=======
// router.get('/skill',auth,bodyParser,skill.getSkill);
>>>>>>> 1311d723acd8069d57612016fab27b058b3675aa

module.exports=router;