const jwt=require('jsonwebtoken');
const HttpError=require('../models/http-error');
module.exports=(req,res,next)=>{
    try{
        //console.log("Entered try")
        const token = req.headers.authorization.split(' ')[1];
        //console.log(token, "6")
        const decoded = jwt.verify(token, 'secret_this_should_be_longer');
        //console.log(decoded);
        if(!decoded){
            throw new Error('Authentication Failed');
        }
        const decodedToken=jwt.verify(token,'secret_this_should_be_longer');
        req.userData={userId:decodedToken.userId, email : decodedToken.email};
        next();

    }catch(err){
        //console.log(err)
        const error=new HttpError('Authentication failed!',401);
        return next(error);
    }
    
}