const mysql = require('mysql2/promise');
require('dotenv').config();
let connection;

const connectDb = async() =>{
    try{
        connection = await mysql.createConnection({
            host : process.env.DB_HOST,
            user : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME  
        })
        return connection;
    } catch(err){
        console.log(err);
    }
    
}

module.exports = connectDb;
