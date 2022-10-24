const {model: { Chat } }=require('../models');
module.exports={
    create: async(req,res)=>{
        console.log(req.body);
        const userId = req.body.userId;
        if(userId){
            //const userName=req.body.userName;
            const jsonField=req.body.jsonField;
            Chat.create({
                userId,
                jsonField

            }).then(()=>{
                
                  res.status(200).json({
                    Status: "Inserted"
                  });
            });
        }
        else{
            res.send('<h1>Not added</h1>');
        }
    
        
                        // res.status(200).json({Status: "Inserted"})
                       
           // const {username,email,newpassword}=req.body;
            
        
    

    },
    getchat: async(req,res)=>{
        console.log(req.body);
        const userId = req.body.userId;
        const chatdata= await Chat.findOne({ where: { userId: userId} });
        if(chatdata){
            //const userName=req.body.userName;
            // const jsonField=req.body.jsonField;
           
                
                  res.status(200).json({
                    chatdata: chatdata
                  });
          
        }
        else{
            res.status(400).json({error:"No chat found"});
        }
    
        
                        // res.status(200).json({Status: "Inserted"})
                       
           // const {username,email,newpassword}=req.body;
            
        
    

    }
}