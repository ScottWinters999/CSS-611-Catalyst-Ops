const jwt=require('jsonwebtoken');
const HttpError=require('../models/http-error');
module.exports=(req,res,next)=>{
    // console.log(req.headers)
    try{
        // console.log(req.headers.authorization)
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            throw new Error('Authentication Failed');
        }
        const decodedToken=jwt.verify(token,'secret_this_should_be_longer');
        req.userData={email : decodedToken.email};
        next();

    }catch(err){
        const error=new HttpError('Authentication failed!',401);
        return next(error);
    }
    
}