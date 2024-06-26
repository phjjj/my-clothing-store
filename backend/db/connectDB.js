// db/connectDB.js
import mysql from "mysql2/promise";
import { dbConfig } from "./dbConfig.js";

export async function connectDB() {
  const pool = await mysql.createPool(dbConfig);
  return pool;
}
