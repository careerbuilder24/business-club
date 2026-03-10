import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

/* ========= CREATE CATEGORY ========= */
export async function POST(req: NextRequest) {
  const conn = await mysql.createConnection(dbConfig);

  try {
    const body = await req.json();
    const { businessType, industry, district } = body;

    if (!businessType || !industry || !district) {
      return NextResponse.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    await conn.execute(
      `INSERT INTO sidebar_categories
      (business_type, industry, district)
      VALUES (?, ?, ?)`,
      [businessType, industry, district]
    );

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  } finally {
    await conn.end();
  }
}


/* ========= GET CATEGORY ========= */
export async function GET() {
  const conn = await mysql.createConnection(dbConfig);

  try {
    const [rows]: any = await conn.execute(
      `SELECT * FROM sidebar_categories ORDER BY id DESC`
    );

    return NextResponse.json({ success: true, categories: rows });

  } finally {
    await conn.end();
  }
}
