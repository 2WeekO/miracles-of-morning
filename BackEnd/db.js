import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

export const db = await mysql.createPool({
  port: 3306,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

