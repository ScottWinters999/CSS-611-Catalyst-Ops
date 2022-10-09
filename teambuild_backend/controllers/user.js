const express = require("express")
const app = express()
const mysql = require("mysql")
require("dotenv").config()
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT
const db = mysql.createPool({
   connectionLimit: 100,
   host: DB_HOST,
   user: DB_USER,
   password: DB_PASSWORD,
   database: DB_DATABASE,
   port: DB_PORT
})
const {model: { User } }=require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
<<<<<<< HEAD
// const generateAccessToken = require("./generateAccessToken")
=======
const port = process.env.PORT
app.listen(port, 
()=> console.log(`Server Started on port ${port}...`))

app.use(express.json())

>>>>>>> 32d7e9155c034216a8aa0cf2af05856719c5a5a6
module.exports={
    create: async(req,res)=>{
        console.log(req.body);
        const emailExists = await User.findOne({ where: { email: req.body.email } });
        if (emailExists ) {
            console.log("Email Already exists");
            res.status(403).send('Status: user already exist');
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
                        res.status(200).send('Status: Inserted'));
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
        const userExists = await User.findOne({ where: { userName: req.body.userName , password: req.body.password} });
        if (userExists) {
            console.log("Logged In Successfully!");
            res.status(200).send('Status: Successfully Logged In!');
        } else {
            console.log("Username or Password is wrong. Try again!");
            res.status(403).send('Wrong username or password');
        }
    }
}

//LOGIN (AUTHENTICATE USER)
app.post("/login", (req, res)=> {
    const user = req.body.UserName
    const password = req.body.UserPassword
    db.getConnection ( async (err, connection)=> {
     if (err) throw (err)
     const sqlSearch = 'SELECT * FROM UserInfo WHERE UserName = ? AND UserPassword = ?'
     const search_query = mysql.format(sqlSearch,[user, password])
     await connection.query (search_query, async (err, result) => {
      connection.release()
      
      if (err) throw (err)
      if (result.length == 0) {
       console.log("--------> User does not exist")
       res.sendStatus(404)
      } 
      else {
         const hashedPassword = result[0].password
         //get the hashedPassword from result
        if (await bcrypt.compare(password, hashedPassword)) {
        console.log("---------> Login Successful")
        res.send(`${user} is logged in!`)
        } 
        else {
        console.log("---------> Password Incorrect")
        res.send("Password incorrect!")
        } //end of bcrypt.compare()
      }//end of User exists i.e. results.length==0
     }) //end of connection.query()
    }) //end of db.connection()
    }) //end of app.post()
