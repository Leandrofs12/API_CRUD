import postgres from 'postgres';
import 'dotenv/config';

const { DB_HOST, DB_NAME, DB_USER, DB_PASS } = process.env;

export const sql = postgres({
  host: DB_HOST,
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASS,
  port: 5432
});