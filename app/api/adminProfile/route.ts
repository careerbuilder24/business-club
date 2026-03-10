
import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

// ---------- GET PROFILE ----------
// export async function GET() {
//   try {
//     const connection = await mysql.createConnection(dbConfig);

//     const [rows]: any = await connection.execute(
//       "SELECT * FROM usersprofile ORDER BY id DESC LIMIT 1"
//     );

//     await connection.end();

//     if (!rows.length) {
//       return NextResponse.json({ success: false, error: "Profile not found" });
//     }

//     return NextResponse.json({ success: true, data: rows[0] });
//   } catch (error: any) {
//     return NextResponse.json({ success: false, error: error.message });
//   }
// }

// ---------- GET PROFILE (BY EMAIL) ----------
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email query param is required" },
        { status: 400 }
      );
    }

    const connection = await mysql.createConnection(dbConfig);

    const [rows]: any = await connection.execute(
      "SELECT * FROM usersprofile WHERE LOWER(email)=LOWER(?) LIMIT 1",
      [email]
    );

    await connection.end();

    return NextResponse.json({ success: true, data: rows?.[0] ?? null });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// ---------- POST (SAVE PROFILE + UPLOAD IMAGE) ----------
export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type");

    // ========== IMAGE UPLOAD ==========
    if (contentType && contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      const email = formData.get("email")?.toString();
      const file = formData.get("file") as File;

      if (!email || !file) {
        return NextResponse.json({
          success: false,
          error: "Missing email or file",
        });
      }

      // Convert file → buffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer).toString("base64");

      // Upload to IMGBB
      const uploadRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
        {
          method: "POST",
          body: new URLSearchParams({
            image: buffer,
            name: `profile_${email}`,
          }),
        }
      );

      const uploadJson = await uploadRes.json();

      if (!uploadJson.success) {
        return NextResponse.json({
          success: false,
          error: "IMGBB upload failed",
        });
      }

      const imageUrl = uploadJson.data.url;

      // Save image URL to DB using email
      const connection = await mysql.createConnection(dbConfig);
      await connection.execute(
        "UPDATE usersprofile SET profile_image=? WHERE email=?",
        [imageUrl, email]
      );
      await connection.end();

      return NextResponse.json({
        success: true,
        imageUrl,
      });
    }

    // ========== SAVE JSON PROFILE ==========
    const body = await req.json();

    const { firstName, lastName, email, phone, address, city, zip, businessCategory } = body;

    const connection = await mysql.createConnection(dbConfig);

    // Check if profile exists
    const [rows]: any = await connection.execute(
      "SELECT * FROM usersprofile WHERE email=?",
      [email]
    );

    if (rows.length > 0) {
      // UPDATE PROFILE
      await connection.execute(
        `UPDATE usersprofile 
         SET firstName=?, lastName=?, phone=?, address=?, city=?, zip=?, businessCategory=? 
         WHERE email=?`,
        [firstName, lastName, phone, address, city, zip, businessCategory, email]
      );
    } else {
      // INSERT NEW
      await connection.execute(
        `INSERT INTO usersprofile 
        (firstName, lastName, email, phone, address, city, zip, businessCategory) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [firstName, lastName, email, phone, address, city, zip, businessCategory]
      );
    }

    await connection.end();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
