// src/config/db.js
import mysql from 'mysql2';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a connection to the MySQL database using environment variables
const connection = mysql.createConnection({
  host: process.env.DB_HOST,       // Database host
  user: process.env.DB_USER,       // Database username
  password: process.env.DB_PASSWORD, // Database password
  database: process.env.DB_NAME,    // Database name
  port: process.env.DB_PORT         // Database port (default is 3306)
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
    return;
  }
  console.log('✅ Connected to MySQL database!');
});

// Export the connection for use in other files
export default connection;

