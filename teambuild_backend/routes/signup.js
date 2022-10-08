const express=require('express');
const router=express.Router();
const db=require('../util/database');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const authController=require('../controllers/auth');
// router.get('/signup',authController.postsignup);

const bodyParser=require('body-parser').json();
const { User }=require('../controllers');
router.post('/signup',bodyParser,User.create);


module.exports=router;