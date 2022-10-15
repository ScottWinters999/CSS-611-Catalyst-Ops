const express=require('express');
const app=express();
const db=require('./models');
const routes=require('./routes/signup');
const bodyParser=require('body-parser');
const { Server }= require('socket.io');
const cors=require('cors');


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  });
  
  app.post("/api/posts", (req, res, next) => {
    const post = req.body;
    console.log(post);
    res.status(201).json({
      message: 'Post added successfully'
    });
  });

  const io= new Server(app,{
    cors:{
      origin:"http://localhost/3000",
      method:["GET","POST"]
    },
  })
  
  io.on("connection",(socket)=>{
    console.log(socket.id);
    socket.on("sent",(data)=>{
      
      socket.emit("receive_message", data);
  
    })
    socket.on("disconnect",()=>{
      console.log("disconnected",socket.id);
    })
  })
  
app.use(bodyParser.urlencoded({ extended: false }));
(async()=>{
    await db.sequelize.sync();
})();


app.use(routes);

app.use('/', (req,res,next)=>{
    res.send('<h1> Welcome to Signup</h1>');
})

app.listen(5000);
