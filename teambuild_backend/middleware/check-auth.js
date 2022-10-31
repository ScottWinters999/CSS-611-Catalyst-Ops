const jwt=require('jsonwebtoken');
const HttpError=require('../models/http-error');
module.exports=(req,res,next)=>{
    try{
        //console.log("Entered try")
        console.log(req.headers)
        const token = req.headers.authorization.split(' ')[1];
        //console.log(token, "6")
        const decoded = jwt.verify(token, 'secret_this_should_be_longer');
        //console.log(decoded);
        if(!decoded){
            throw new Error('Authentication Failed');
        }
        req.userData={email : decoded.email, userId: decoded.userId};        
        next();

    }catch(err){
        //console.log(err)
        const error=new HttpError('Authentication failed!',401);
        return next(error);
    }
    
}