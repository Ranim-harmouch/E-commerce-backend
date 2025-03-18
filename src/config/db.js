import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create the connection using promise-based mysql2
const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// You can test the connection using a simple query
try {
  await connection.query('SELECT 1'); // A simple query to check if the connection is successful
  console.log('✅ Connected to MySQL database!');
} catch (err) {
  console.error('❌ Database connection failed:', err);
}

export default connection;