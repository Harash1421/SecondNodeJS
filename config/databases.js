const mysql = require('mysql');

const dotenv = require('dotenv');

dotenv.config({path : './.env'});

var db = mysql.createConnection({
    port : 3306,
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
});

db.connect( (error) => {
    if(error){
        console.log(error);
    }else{
        console.log('MYSQL Connected Complete....')
    }
});

module.exports = db;