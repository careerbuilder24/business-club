
// import { NextRequest, NextResponse } from "next/server";
// import mysql from "mysql2/promise";
// import { createClient } from "@supabase/supabase-js";

// const dbConfig = {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// };

// // Supabase client
// const supabase = createClient(
//   process.env.SUPABASE_URL!,
//   process.env.SUPABASE_ANON_KEY!
// );



// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();

//     const {
//       memberName,
//       mobile,
//       email,
//       packageId,
//       packageName,
//       packagePriceText,
//       memberType,
//       idCard,
//       paymentMethod,
//       senderWalletNumber,
//       trxId,
//       note,
//       status = "pending",
//     } = body;

//     // Basic validation
//     if (
//       !memberName ||
//       !mobile ||
//       !packageId ||
//       !packageName ||
//       !packagePriceText ||
//       !memberType ||
//       !idCard ||
//       !paymentMethod ||
//       !senderWalletNumber ||
//       !trxId
//     ) {
//       return NextResponse.json(
//         { success: false, error: "Required fields missing" },
//         { status: 400 }
//       );
//     }

//     // Try to parse numeric amount from price text, fallback to null
//     // e.g. "25000/Year (+5% VAT)" -> 25000
//     let amountNumeric: number | null = null;
//     const match = String(packagePriceText).match(/(\d+(\.\d+)?)/);
//     if (match) {
//       amountNumeric = parseFloat(match[1]);
//     }

//     // ------------------- Insert into MySQL -------------------
//     const connection = await mysql.createConnection(dbConfig);

//     const mysqlQuery = `
//       INSERT INTO business_club_payments
//         (
//           member_name,
//           mobile,
//           email,
//           package_id,
//           package_name,
//           package_price_text,
//           amount_numeric,
//           member_type,
//           id_card,
//           payment_method,
//           sender_wallet_number,
//           trx_id,
//           note,
//           status
//         )
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//       ON DUPLICATE KEY UPDATE
//         member_name          = VALUES(member_name),
//         mobile               = VALUES(mobile),
//         email                = VALUES(email),
//         package_id           = VALUES(package_id),
//         package_name         = VALUES(package_name),
//         package_price_text   = VALUES(package_price_text),
//         amount_numeric       = VALUES(amount_numeric),
//         member_type          = VALUES(member_type),
//         id_card              = VALUES(id_card),
//         payment_method       = VALUES(payment_method),
//         sender_wallet_number = VALUES(sender_wallet_number),
//         note                 = VALUES(note),
//         status               = VALUES(status)
//     `;

//     const [result] = await connection.execute(mysqlQuery, [
//       memberName,
//       mobile,
//       email || null,
//       packageId,
//       packageName,
//       packagePriceText,
//       amountNumeric,
//       memberType,
//       idCard,
//       paymentMethod,
//       senderWalletNumber,
//       trxId,
//       note || null,
//       status,
//     ]);

//     await connection.end();

//     // ------------------- Insert into Supabase -------------------
//     const { error } = await supabase.from("business_club_payments").insert([
//       {
//         member_name: memberName,
//         mobile,
//         email,
//         package_id: packageId,
//         package_name: packageName,
//         package_price_text: packagePriceText,
//         amount_numeric: amountNumeric,
//         member_type: memberType,
//         id_card: idCard, // ⬅ matches Supabase column
//         payment_method: paymentMethod,
//         sender_wallet_number: senderWalletNumber,
//         trx_id: trxId,
//         note,
//         status,
//       },
//     ]);

//     if (error) {
//       console.error("Supabase insert error:", error);
//       throw error;
//     }

//     return NextResponse.json({
//       success: true,
//       id: (result as any).insertId ?? null,
//     });
//   } catch (err) {
//     console.error("POST /business-club-payments ERROR:", err);
//     return NextResponse.json(
//       { success: false, error: (err as Error).message },
//       { status: 500 }
//     );
//   }
// }

// // ------------------- GET API -------------------
// export async function GET() {
//   try {
//     const connection = await mysql.createConnection(dbConfig);

//     const [rows] = await connection.execute(`
//       SELECT
//         id,
//         member_name,
//         mobile,
//         email,
//         package_id,
//         package_name,
//         package_price_text,
//         amount_numeric,
//         member_type,
//         id_card,
//         payment_method,
//         sender_wallet_number,
//         trx_id,
//         note,
//         status,
//         created_at,
//         updated_at
//       FROM business_club_payments
//       ORDER BY id DESC
//     `);

//     await connection.end();

//     return NextResponse.json({ success: true, data: rows });
//   } catch (err) {
//     console.error("GET /business-club-payments ERROR:", err);
//     return NextResponse.json(
//       { success: false, error: (err as Error).message },
//       { status: 500 }
//     );
//   }
// }

// // ------------------- PATCH API (Update status) -------------------
// export async function PATCH(req: NextRequest) {
//   try {
//     const body = await req.json();

//     const { id, status } = body as {
//       id: number;
//       status: "active" | "rejected" | "pending";
//     };

//     if (!id || !status) {
//       return NextResponse.json(
//         { success: false, error: "id and status are required" },
//         { status: 400 }
//       );
//     }

//     // allow only these statuses
//     if (!["active", "rejected", "pending"].includes(status)) {
//       return NextResponse.json(
//         { success: false, error: "Invalid status value" },
//         { status: 400 }
//       );
//     }

//     // ------------------- Update MySQL -------------------
//     const connection = await mysql.createConnection(dbConfig);

//     await connection.execute(
//       `UPDATE business_club_payments
//        SET status = ?, updated_at = NOW()
//        WHERE id = ?`,
//       [status, id]
//     );

//     await connection.end();

//     // ------------------- Update Supabase -------------------
//     const { error } = await supabase
//       .from("business_club_payments")
//       .update({ status })
//       .eq("id", id);

//     if (error) {
//       console.error("Supabase update error:", error);
//       return NextResponse.json(
//         { success: false, error: "Supabase update failed" },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error("PATCH /business-club-payments ERROR:", err);
//     return NextResponse.json(
//       { success: false, error: (err as Error).message },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { createClient } from "@supabase/supabase-js";

// ---------------- DB CONFIG ----------------
const dbConfig = {
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASS!,
  database: process.env.DB_NAME!,
};

// ---------------- SUPABASE ----------------
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// ================= POST =================
export async function POST(req: NextRequest) {
  let connection: mysql.Connection | null = null;

  try {
    const body = await req.json();

    const {
      memberName,
      mobile,
      email,
      packageId,
      packageName,
      packagePriceText,
      memberType,
      idCard,
      paymentMethod,
      senderWalletNumber,
      trxId,
      note,
      status = "pending",
    } = body;

    // ---------- BASIC VALIDATION ----------
    if (
      !memberName ||
      !mobile ||
      !packageId ||
      !packageName ||
      !packagePriceText ||
      !memberType ||
      !idCard ||
      !paymentMethod ||
      !senderWalletNumber ||
      !trxId
    ) {
      return NextResponse.json(
        { success: false, error: "Required fields missing" },
        { status: 400 }
      );
    }

    // ---------- SAFE NORMALIZATION ----------
    const safeEmail =
      typeof email === "string" && email.trim() !== "" ? email : "";

    const safeNote =
      typeof note === "string" && note.trim() !== "" ? note : null;

    // ---------- PARSE AMOUNT ----------
    let amountNumeric: number | null = null;
    const match = String(packagePriceText).match(/(\d+(\.\d+)?)/);
    if (match) amountNumeric = parseFloat(match[1]);

    // ---------- MYSQL ----------
    connection = await mysql.createConnection(dbConfig);

    // 🔒 Check duplicate TRX
    const [existing] = await connection.execute(
      "SELECT id FROM business_club_payments WHERE trx_id = ? LIMIT 1",
      [trxId]
    );

    if ((existing as any[]).length > 0) {
      await connection.end();
      return NextResponse.json(
        { success: false, error: "TRX ID already exists" },
        { status: 409 }
      );
    }

    // ---------- INSERT MYSQL ----------
    const [result] = await connection.execute(
      `
      INSERT INTO business_club_payments
      (
        member_name,
        mobile,
        email,
        package_id,
        package_name,
        package_price_text,
        amount_numeric,
        member_type,
        id_card,
        payment_method,
        sender_wallet_number,
        trx_id,
        note,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        memberName,
        mobile,
        safeEmail,
        packageId,
        packageName,
        packagePriceText,
        amountNumeric,
        memberType,
        idCard,
        paymentMethod,
        senderWalletNumber,
        trxId,
        safeNote,
        status,
      ]
    );

    await connection.end();

    // ---------- INSERT SUPABASE (NON-BLOCKING) ----------
    const { error: supabaseError } = await supabase
      .from("business_club_payments")
      .insert([
        {
          member_name: memberName,
          mobile,
          email: safeEmail,
          package_id: packageId,
          package_name: packageName,
          package_price_text: packagePriceText,
          amount_numeric: amountNumeric,
          member_type: memberType,
          id_card: idCard,
          payment_method: paymentMethod,
          sender_wallet_number: senderWalletNumber,
          trx_id: trxId,
          note: safeNote,
          status,
        },
      ]);

    //  Do NOT crash API if Supabase fails
    if (supabaseError) {
      console.error("Supabase insert failed:", supabaseError);
    }

    return NextResponse.json({
      success: true,
      id: (result as any).insertId ?? null,
    });
  } catch (err: any) {
    console.error("POST /business-club-payments ERROR:", {
      message: err.message,
      code: err.code,
      sqlMessage: err.sqlMessage,
      stack: err.stack,
    });

    return NextResponse.json(
      { success: false, error: err.message || "Internal server error" },
      { status: 500 }
    );
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch {}
    }
  }
}

// ================= GET =================
export async function GET() {
  let connection: mysql.Connection | null = null;

  try {
    connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(`
      SELECT
        id,
        member_name,
        mobile,
        email,
        package_id,
        package_name,
        package_price_text,
        amount_numeric,
        member_type,
        id_card,
        payment_method,
        sender_wallet_number,
        trx_id,
        note,
        status,
        created_at,
        updated_at
      FROM business_club_payments
      ORDER BY id DESC
    `);

    await connection.end();

    return NextResponse.json({ success: true, data: rows });
  } catch (err: any) {
    console.error("GET /business-club-payments ERROR:", err);

    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch {}
    }
  }
}

// ================= PATCH =================
export async function PATCH(req: NextRequest) {
  let connection: mysql.Connection | null = null;

  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "id and status required" },
        { status: 400 }
      );
    }

    if (!["active", "rejected", "pending"].includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid status value" },
        { status: 400 }
      );
    }

    connection = await mysql.createConnection(dbConfig);

    await connection.execute(
      `UPDATE business_club_payments
       SET status = ?, updated_at = NOW()
       WHERE id = ?`,
      [status, id]
    );

    await connection.end();

    const { error } = await supabase
      .from("business_club_payments")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("Supabase update failed:", error);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("PATCH /business-club-payments ERROR:", err);

    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch {}
    }
  }
}
