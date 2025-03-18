
import mysql from 'mysql2';   // 
import dotenv from 'dotenv';

dotenv.config();  

console.log('DB_HOST:', process.env.DB_HOST);   //
console.log('DB_USER:', process.env.DB_USER);   //
console.log('DB_NAME:', process.env.DB_NAME);   //
console.log('DB_PORT:', process.env.DB_PORT);   //

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,    //
  connectionLimit: 10,         //
  queueLimit: 0                //
}).promise();                  //

export default connection;
