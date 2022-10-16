const express=require('express');
const router=express.Router();
const db=require('../util/database');
const auth=require('../middleware/check-auth')
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const authController=require('../controllers/auth');
// router.get('/signup',authController.postsignup);

const bodyParser=require('body-parser').json();
const { User }=require('../controllers');
const { UserProfile }=require('../controllers');
router.post('/signup',bodyParser,User.create);
router.post('/login',bodyParser,User.login);
router.get('/userprofile',auth,bodyParser,UserProfile.userprofile);
router.get('/skill',auth,bodyParser,UserProfile.skill);
router.get('/goal',auth,bodyParser,UserProfile.goal);

module.exports=router;