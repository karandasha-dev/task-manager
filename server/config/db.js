import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD),
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
});

pool
  .connect()
  .then((client) => {
    console.log("PostgreSQL підключено");
    client.release();
  })
  .catch((error) => {
    console.log("Помилка підключення до PostgreSQL:", error.message);
  });

export default pool;
