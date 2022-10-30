const {
  model: { User },
} = require("../models");
const {model: { UserProfile } }=require('../models');

const bcrypt = require("bcrypt");
const saltRounds = 10;
// const generateAccessToken = require("./generateAccessToken")
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const crypto = require("crypto");

module.exports = {
  create: async (req, res) => {
    console.log(req.body);
    const emailExists = await User.findOne({
      where: { email: req.body.email },
    });
    if (emailExists) {
      console.log("Email Already exists");
      console.log(emailExists.userId);
      res.status(403).json({ Status: "user already exist" });
    } else {
      if (req.body.userName && req.body.password) {
        console.log(req.body);
        bcrypt
          .genSalt(saltRounds)
          .then((salt) => {
            console.log(`Salt: ${salt}`);
            return bcrypt.hash(req.body.password, salt);
          })
          .then((hash) => {
            const userName = req.body.userName;
            const email = req.body.email;
            const password = hash;
            const firstName = req.body.firstName;
            const lastName = req.body.lastName;
            const role = req.body.role;
            // Store hash in your password DB.
            User.create({
              userName,
              password,
              email,
              firstName,
              lastName,
              role
            }).then(
              (response) => {
               // console.log("60", response);
                const token = jwt.sign(
                  { userId: response.userId,email: email, role: role },
                  "secret_this_should_be_longer",
                  { expiresIn: "1h" }
                );
                return token;
                // res.status(200).json({
                //   token: token,
                // });
              }
            
             // res.status(200).json({Status: "Inserted"})
            ).  then(async(token)=>{
              const userNew = await User.findOne({
                where: { email: email }
              });
              if(userNew){
                  const userUserId=userNew.userId;
                  
                  UserProfile.create({
                  userUserId,
                  firstName,
                  lastName,
                  email
              }).then(()=>{
                res.status(200).json({
                  token: token,
                });
              });
              }
              //   console.log("printing usewNEw ",userNew);
              // else
              //   console.log("not printing userNew");
              // res.status(200).json({
              //       token: token,
              //     });
              

            });
            
            


          });
        // const {username,email,newpassword}=req.body;
      } else {
        res.send("<h1>Not added</h1>");
      }
    }
  },
  login: async (req, res) => {
    console.log(req.body);
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (!userExists) {
      res.status(403).json({ Status: "User does not exist" });
    } else {
      bcrypt.compare(
        req.body.password,
        userExists.password,
        function (err, response) {
          if (err) {
            // handle error
            console.log("error", err);
          }
          if (response) {
            // Send JWT
            console.log("Logged In Successfully!");
            const token = jwt.sign(
              {
                userId: userExists.userId,
                email: userExists.email,
                role: userExists.role,
              },
              "secret_this_should_be_longer",
              { expiresIn: "1h" }
            );

            res.status(200).json({
              token: token,
            });
          } else {
            // response is OutgoingMessage object that server response http request
            console.log("Username or Password is wrong. Try again!");
            res.status(403).json({ Status: "Wrong username or password" });
          }
        }
      );
    }
  },
  forgetpassword: async (req, response) => {
    console.log(req.body);
    const send_grid_api = process.env.SENDGRID_API_KEY;
    const transporter = nodemailer.createTransport(
      sendgridTransport({
        auth: {
          api_key: send_grid_api,
        },
      })
    );
    console.log(send_grid_api,'apii');
    const userExists = await User.findOne({ where: { email: req.body.email } });
    console.log(120, userExists);
    if (!userExists) {
      response.status(403).json({ Status: "User does not exist" });
    } else {
      const token = crypto.randomBytes(32).toString("hex");
      console.log(token, "token");
      console.log("125", req.body.email);
      //   console.log()
      User.update(
        {
          resetPasswordToken: token,
          resetPasswordExpires: Date.now() + 3600000,
        },
        {
          where: {
            email: req.body.email,
          },
        }
      ).then((res) => {
        transporter
          .sendMail({
            to: req.body.email,
            from: "asheeque123456@gmail.com",
            subject: "Reset password",
            html: `
                    <p>You requested a password reset</p>
                    <p>Click this <a href="http://localhost:3000/resetpassword/${token}">link</a> to set a new password</p>
                    `,
          })
          .then(() => {
            response.status(200).json({ status: "Link send" });
          });
      });
      console.log(userExists);
    }
  },

  resetpassword: async (req, res) => {
    console.log(req.body);
    console.log(process.env.SENDGRID_API_KEY, "api");

    const password = req.body.password;
    const newToken = req.body.token;
    const userExists = await User.findOne({
      where: {
        resetPasswordToken: newToken,

        resetPasswordExpires: {
          [Op.gt]: Date.now(),
        },
      },
    });
    if (userExists) {
      console.log(userExists);
      const email = userExists.dataValues.email;
      // console.log(pe,Date.UTC())
      bcrypt
        .genSalt(saltRounds)
        .then((salt) => {
          console.log(`Salt: ${salt}`);
          return bcrypt.hash(password, salt);
        })
        .then((hash) => {
          console.log(hash);
          User.update(
            {
              resetPasswordToken: null,
              resetPasswordExpires: null,
              password: hash,
            },
            {
              where: {
                email: email,
              },
            }
          ).then((data) => {
            res.status(200).json({ status: "password updated" });
          });
        });
    } else {
      console.log("ccc");
    }
    else{
        console.log('ccc')
    }
        
  },

  upload: async (req, response) => {
    const image = req.file.buffer.toString('base64');
    const userId=req.body.userId;
    if(userId && image){
      User.update(
        {
          userId: userId,
          profilePicture: image
        }
      ).then(()=>{
        res.status(200).json({status:"Photo Updated successfully"})
      })
    }else{
      res.status(400).json({status:"Wrong user or image"});
    }

    
  }

  

};
