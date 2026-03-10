import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { createClient } from "@supabase/supabase-js";

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { company, serviceType, amount, paymentDate, paymentStatus, transactionId } = await req.json();

    if (!company || !amount || !paymentDate || !transactionId) {
      return NextResponse.json({ success: false, error: "Required fields missing" }, { status: 400 });
    }

    // ------------------- Insert into MySQL -------------------
    const connection = await mysql.createConnection(dbConfig);
  const mysqlQuery = `
  INSERT INTO finance_records
    (company, service_type, amount, payment_date, payment_status, transaction_id)
  VALUES (?, ?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE
    company = VALUES(company),
    service_type = VALUES(service_type),
    amount = VALUES(amount),
    payment_date = VALUES(payment_date),
    payment_status = VALUES(payment_status)
`;

    const [result] = await connection.execute(mysqlQuery, [
      company,
      serviceType,
      parseFloat(amount),
      paymentDate,
      paymentStatus,
      transactionId,
    ]);
    await connection.end();

    // ------------------- Insert into Supabase -------------------
    const { error } = await supabase.from("finance_records").insert([
      {
        company,
        service_type: serviceType,
        amount: parseFloat(amount),
        payment_date: paymentDate,
        payment_status: paymentStatus,
        transaction_id: transactionId,
      },
    ]);
    if (error) throw error;

    return NextResponse.json({ success: true, id: (result as any).insertId });
  } catch (err) {
    console.error("POST API ERROR:", err);
    return NextResponse.json({ success: false, error: (err as Error).message }, { status: 500 });
  }
}


// ------------------- GET API -------------------
export async function GET() {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(`
      SELECT id, company, service_type, amount, payment_date, payment_status, transaction_id, created_at
      FROM finance_records
      ORDER BY id DESC
    `);
    await connection.end();

    return NextResponse.json({ success: true, data: rows });
  } catch (err) {
    console.error("GET API ERROR:", err);
    return NextResponse.json({ success: false, error: (err as Error).message }, { status: 500 });
  }
}
