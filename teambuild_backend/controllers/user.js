const {model: { User } }=require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
// const generateAccessToken = require("./generateAccessToken")
const jwt = require("jsonwebtoken")
module.exports={
    create: async(req,res)=>{
        console.log(req.body);
        const emailExists = await User.findOne({ where: { email: req.body.email } });
        if (emailExists ) {
            console.log("Email Already exists");
            res.status(403).json({Status: "user already exist"});
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
                        res.status(200).json({Status: "Inserted"}));
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
        const userExists = await User.findOne({ where: { email: req.body.email} });
        bcrypt.compare(req.body.password, userExists.password, function(err, response) {
            if (err){
                // handle error
                console.log("error", err)
              }
              if (response) {
                // Send JWT
                console.log("Logged In Successfully!");
                const token = jwt.sign(
                    { email: userExists.email, role: userExists.role },
                    "secret_this_should_be_longer",
                    { expiresIn: "1h" }
                  );
                  res.status(200).json({
                    token: token
                  });
            
              } else {
                // response is OutgoingMessage object that server response http request
                console.log("Username or Password is wrong. Try again!");
                res.status(403).json({Status:'Wrong username or password'});
              }
            
        });
    },
    profile: async(req,res)=>{
        console.log(req.body);
        var decoded = jwt_decode(token);
        const firstName=req.body.firstName;
        const lastName=req.body.lastName;
        const location=req.body.location;
        const curPos=req.body.curPos;
        const industry=req.body.industry;
        const phoneNumber=req.body.phoneNumber;
        const email=req.body.email;
        const skillset=req.body.skillset;
        const experience=req.body.experience;
        const goal=req.body.goal;
        const addNewGoal=req.body.addNewGoal;
        // Store hash in your password DB.
        UserProfile.create({
            firstName,
            lastName,
            location,
            curPos,
            industry,
            phoneNumber,
            email,
            skillset,
            experience,
            goal,
            addNewGoal
        }).then(
            res.status(200).json({"First name": firstName, "Last name": lastName, "Location": location, "Current Position": curPos, "Industry": industry, 
            "Phone Number": phoneNumber, "Email": email, "Skillset": skillset, "Experience": experience, "Goal": goal, "Add New Goal": addNewGoal}));
           // const {username,email,newpassword}=req.body;
            console.log("Profile Successfully created")
        }
    }



