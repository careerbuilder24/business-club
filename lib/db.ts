
import dotenv from "dotenv";
// Import the specific types needed for a promise-based connection
import mysql, { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";

dotenv.config();

// 1. Define the interface for the structure of a user row in your database
export interface User extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password: string; // Hashed password
  role: string;
  created_at: Date; // Or string, depending on how MySQL returns it
}

// 2. Define the interface for a new user object that will be inserted
export interface NewUser {
  name: string;
  email: string;
  password: string; // Hashed password
  role: string;
}

// Extend the global object's type definition to allow storing the pool
declare global {
  var _mysqlPool: Pool | undefined;
}

let promisePool: Pool;

// Type assertion for environment variables, assuming they are defined
// Note: In a real-world scenario, you might add checks to ensure they exist.
const dbHost = process.env.DB_HOST as string;
const dbUser = process.env.DB_USER as string;
const dbPass = process.env.DB_PASS as string;
const dbName = process.env.DB_NAME as string;
// Convert port to number, or default to 3306
const dbPort = parseInt(process.env.DB_PORT || '3306', 10);


if (!global._mysqlPool) {
  // Use mysql.createPool from 'mysql2/promise' for an automatically promised-based pool
  const poolConfig = {
    host: dbHost,
    user: dbUser,
    password: dbPass,
    database: dbName,
    port: dbPort,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };

  // The pool is already promise-based when imported from 'mysql2/promise'
  const newPool = mysql.createPool(poolConfig);
  promisePool = newPool;
  global._mysqlPool = promisePool; // Store in global to reuse
} else {
  // Use the existing pool
  promisePool = global._mysqlPool;
}

/**
 * Retrieves a user from the database based on their email address.
 * @param email The email address to search for.
 * @returns The user object, typed as 'User', or null if not found.
 */
export async function getUserByEmail(email: string | undefined): Promise<User | null> {
  try {
    if (!email) return null;

    const trimmedEmail = email.trim().toLowerCase();
    
    // The query results array is destructured into [rows, fields].
    // We use User[] to correctly type the rows as an array of our User interface.
    const [rows] = await promisePool.query<User[]>(
      "SELECT * FROM users WHERE LOWER(email) = ?",
      [trimmedEmail]
    );

    // If rows exist, return the first one; otherwise, return null.
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Database query error in getUserByEmail:", error);
    return null;
  }
}

/**
 * Inserts a new user management record into the database.
 * @param userData The data for the new user (name, email, password, role).
 * @returns The result header from the insertion, including the insertId.
 */
export async function createUserManagement(userData: NewUser): Promise<ResultSetHeader | null> {
    try {
        const { name, email, password, role } = userData;

        // Note: The SQL table name 'user_managements' is used, as suggested.
        // We ensure 'created_at' is handled by the database or by a JS Date object.
        const [result] = await promisePool.execute<ResultSetHeader>(
            `INSERT INTO users (name, email, password, role, created_at)
             VALUES (?, ?, ?, ?, NOW())`,
            [name, email, password, role]
        );

        return result;
    } catch (error) {
        console.error("Database insertion error in createUserManagement:", error);
        return null;
    }
}

export default promisePool;