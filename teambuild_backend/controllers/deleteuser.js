const {
  model: { User,UserPosition },
} = require("../models");
const {
  model: { UserProfile },
} = require("../models");

const bcrypt = require("bcrypt");
const saltRounds = 10;
// const generateAccessToken = require("./generateAccessToken")
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

// const dotenv = require('dotenv');
// dotenv.config();
const crypto = require("crypto");
const { constants } = require("buffer");

module.exports = {
    delete: async (req, res) => {
        const userId= req.userData.userId;
        if(userId){

            const position= await UserPosition.destroy({
                include:{
                    
                }
                where:{
                    userUserId:userId
                }
            });




        }else{
            res.status(200).json({status:"wrong user"});
        }
    }
}