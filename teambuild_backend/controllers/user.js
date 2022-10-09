const {model: { User } }=require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
// const generateAccessToken = require("./generateAccessToken")
module.exports={
    create: async(req,res)=>{
        console.log(req.body);
        const emailExists = await User.findOne({ where: { email: req.body.email } });
        if (emailExists ) {
            console.log("Email Already exists");
            res.status(403).send('Status: user already exist');
        }else{
        if(req.body.userName && req.body.password){
            console.log(req.body);
            bcrypt.genSalt(saltRounds)
                .then(salt => {
                    console.log(`Salt: ${salt}`);
                    return bcrypt.hash(req.body.password, salt);
                })
                .then(hash => {
                    const userName=req.body.userName;
                    const email=req.body.email;
                    const password=hash;
                    const firstName=req.body.firstName;
                    const lastName=req.body.lastName;
                    const role=req.body.role;
                    // Store hash in your password DB.
                    User.create({
                        userName,
                        password,
                        email,
                        firstName,
                        lastName,
                        role

                    }).then(
                        res.status(200).send('Status: Inserted'));
                })
           // const {username,email,newpassword}=req.body;
            
        }  
        else{
            res.send('<h1>Not added</h1>');
        }
    }

    },
    login: async(req,res)=>{
        console.log(req.body);
        const userExists = await User.findOne({ where: { userName: req.body.userName , password: req.body.password} });
        if (userExists) {
            console.log("Logged In Successfully!");
            res.status(200).send('Status: Successfully Logged In!');
        } else {
            console.log("Username or Password is wrong. Try again!");
            res.status(403).send('Wrong username or password');
        }
    }
}



