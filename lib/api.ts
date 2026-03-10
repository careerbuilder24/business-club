
import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

export interface Listing {
  id: number;
  listing_name: string;
  company_name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  logo_url?: string;
  category: string;
  status: string;
  district: string;
}

export async function getListings(): Promise<Listing[]> {
  const connection = await mysql.createConnection(dbConfig);
  const [rows] = await connection.execute(
    `SELECT id, listing_name, company_name, description, address, phone, email, website, logo_url, category,  status, district FROM listings ORDER BY id DESC`
  );
  await connection.end();
  return rows as Listing[];
}
