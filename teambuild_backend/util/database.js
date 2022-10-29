// const mysql=require('mysql2');
// const pool=mysql.createPool({
//     host:'localhost',
//     user: 'root',
//     database: 'caty',
//     password: 'Porsche@2024'
// });

// module.exports=pool.promise();
// require('dotenv').config();
// module.exports={
    

//     HOST: process.env.DB_HOST,
//     USER: process.env.DB_USER,
//     DATABASE: process.env.DB_NAME,
//     PASSWORD: process.env.DB_PASSWORD,
//     DIALECT:'mysql'
// }


// module.exports={
//     HOST: 'localhost',
//     USER: 'root',
//     DATABASE: 'caty',
//     PASSWORD: 'Porsche@2024',
//     DIALECT:'mysql',
//     port:'3306',
//     timeout:'5000'
// }

const dotenv = require('dotenv');
dotenv.config();
//console.log(DB_HOST);
module.exports={
    
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    DATABASE: process.env.DB_NAME,
    PASSWORD: process.env.DB_PASSWORD,
    DIALECT:'mysql',
    port:process.env.DB_PORT,
    timeout:'5000'
}



// module.exports={
//     HOST: 'ec2-3-83-135-245.compute-1.amazonaws.com',
//     USER: 'ubuntu',
//     DATABSE: 'caty',
//     PASSWORD: 'Ubcaty@2023',
//     DIALECT:'mysql',
//     port:'3306',
//     timeout:'5000'
// }