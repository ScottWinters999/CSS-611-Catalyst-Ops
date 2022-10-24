// const generateAccessToken = require("./generateAccessToken")
const jwt = require("jsonwebtoken");
const {model: { UserProfile } }=require('../models');
const {model: { Skills } }=require('../models');
const {model: { Goal } }=require('../models');
const { Op } = require("sequelize");
//var decoded = jwt.verify(token, 'secret_this_should_be_longer');
module.exports={
    userprofile: async(req,res)=>{
        // const jwttoken = req.headers.authorization.split(' ')[1];
        // console.log(jwttoken)
        // const decoded = jwt.verify(jwttoken, 'secret_this_should_be_longer');
        if (req.userData.userId) {
                //const decoded_token = jwt.decode(jwttoken)
                userId = req.userData.userId
                const userExists = await UserProfile.findOne({ where: { userId: userId} });
                const userSkill= await Skills.findAll({where: {userId: userId} });
                const userGoal = await Goal.findAll({where:{userId: userId}});
                // console.log(userExists)
                let userObject;
                if(userExists){
                        console.log(userExists.dataValues)
                        userObject = {
                                'firstName':userExists.dataValues.firstName,
                                'lastName':userExists.dataValues.lastName,
                                'email':userExists.dataValues.email,
                                'location': userExists.dataValues.location,
                                'phone' : userExists.dataValues.phoneNumber,
                                'currentPosition' : userExists.dataValues.currentPosition,
                                'industry' : userExists.dataValues.industry,
                                'isPremiumUser' : userExists.dataValues.isPremiumUser,
                                'skillset' : userSkill,
                                'goal' : userGoal
                        }
                        
                        res.status(200).json({userData:userObject})

                }
        } else {
                res.status(403).json({Status:'Sorry Wrong token'});
        }
    },
    search: async(req,res)=>{
        // const jwttoken = req.headers.authorization.split(' ')[1];
        // console.log(jwttoken)
        // const decoded = jwt.verify(jwttoken, 'secret_this_should_be_longer');
        if (req.userData.userId) {
                //const decoded_token = jwt.decode(jwttoken)
                userId = req.userData.userId
                const userExistsAll = await UserProfile.findAll({ where: { [Op.not]: [
                        { userId: userId }]}} );
                var userExistsAll_length = userExistsAll.length
                var objectArray = []
                var i = 0
                while (i < userExistsAll_length) {
                        const userExists = await UserProfile.findOne({ where: { userId: userExistsAll[i].userId} });
                        const userSkill= await Skills.findAll({where: {userId: userExistsAll[i].userId} });
                        const userGoal = await Goal.findAll({where:{userId: userExistsAll[i].userId}});
                        let userObject;
                        if(userExists){
                                userObject = {
                                        'firstName':userExists.dataValues.firstName,
                                        'lastName':userExists.dataValues.lastName,
                                        'email':userExists.dataValues.email,
                                        'location': userExists.dataValues.location,
                                        'phone' : userExists.dataValues.phoneNumber,
                                        'currentPosition' : userExists.dataValues.currentPosition,
                                        'industry' : userExists.dataValues.industry,
                                        'isPremiumUser' : userExists.dataValues.isPremiumUser,
                                        'skillset' : userSkill,
                                        'goal' : userGoal
                                }
                                objectArray.push(userObject)
        
                        }
                        i = i + 1;
                        
                }
                res.status(200).json({UsersData:objectArray})
        } else {
                res.status(403).json({Status:'Sorry Wrong token'});
        }
    }
}