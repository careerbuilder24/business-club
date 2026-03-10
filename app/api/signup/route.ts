
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import db from "@/lib/db";
import bcrypt from "bcryptjs";
export async function POST(req: Request) {
  try {
    const { fullName, email, password } = await req.json();

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let supabaseResult = null;
    let mysqlResult = null;

    // ---------------------------------------
    // 1️⃣ Insert into Supabase (if configured)
    // ---------------------------------------
    if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
      const { data: existingUser, error: findError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .limit(1);

      if (findError) console.error("Supabase check error:", findError);

      if (existingUser && existingUser.length > 0) {
        return NextResponse.json(
          { message: "Email already registered" },
          { status: 400 }
        );
      }

      const { error: supabaseError } = await supabase.from("users").insert([
        {
          full_name: fullName,
          email,
          password: hashedPassword,
        },
      ]);

      if (supabaseError) {
        console.error("Supabase insert error:", supabaseError);
        supabaseResult = "failed";
      } else {
        supabaseResult = "saved";
      }
    }

    // ---------------------------------------
    // 2️⃣ Insert into MySQL (Workbranch)
    // ---------------------------------------
    try {
      const [existing] = await db.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

      if (Array.isArray(existing) && existing.length > 0) {
        return NextResponse.json(
          { message: "Email already registered" },
          { status: 400 }
        );
      }

      await db.query(
        "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)",
        [fullName, email, hashedPassword]
      );

      mysqlResult = "saved";
    } catch (mysqlError) {
      console.error("MySQL insert error:", mysqlError);
      mysqlResult = "failed";
    }

    // ---------------------------------------
    // 3️⃣ Response Handling
    // ---------------------------------------
    return NextResponse.json(
      {
        message: "Signup successful",
        supabase: supabaseResult,
        mysql: mysqlResult,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}