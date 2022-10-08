const express=require('express');
const app=express();
const db=require('./models');
const routes=require('./routes/signup');
const bodyParser=require('body-parser');


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
  
app.use(bodyParser.urlencoded({ extended: false }));
(async()=>{
    await db.sequelize.sync();
})();


app.use(routes);

app.use('/', (req,res,next)=>{
    res.send('<h1> Welcome to Signup</h1>');
})

app.listen(5000);
