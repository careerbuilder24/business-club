import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient"; // optional Supabase client
import db from "@/lib/db"; // Workbranch/MySQL client

export async function GET() {
  try {
    // --- Fetch from Supabase if URL & KEY exist ---
    if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
      const { data: users, error } = await supabase.from("users").select("*");

      if (error) {
        console.error("Supabase fetch error:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
      }

      return NextResponse.json({ users, source: "Supabase" }, { status: 200 });
    }

    // --- Fallback to Workbranch/MySQL ---
    const [rows] = await db.query("SELECT * FROM users");
    return NextResponse.json({ users: rows, source: "MySQL" }, { status: 200 });
  } catch (error) {
    console.error("GET users error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
