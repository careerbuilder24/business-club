// import { NextResponse } from "next/server";
// import  db  from "@/lib/db";
// import bcrypt from "bcryptjs";

// export async function POST(req: Request) {
//   try {
//     const { fullName, email, password } = await req.json();

//     // Check existing user
//     const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
//     if (Array.isArray(existing) && existing.length > 0) {
//       return NextResponse.json({ message: "Email already registered" }, { status: 400 });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert into DB
//     await db.query(
//       "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)",
//       [fullName, email, hashedPassword]
//     );

//     return NextResponse.json({ message: "Signup successful" }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { fullName, email, password } = await req.json();

    // Check if user exists
    const { data: existing, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .limit(1);

    if (fetchError) throw fetchError;
    if (existing && existing.length > 0) {
      return NextResponse.json({ message: "Email already registered" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const { error: insertError } = await supabase
      .from("users")
      .insert([{ full_name: fullName, email, password: hashedPassword }]);

    if (insertError) throw insertError;

    return NextResponse.json({ message: "Signup successful" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
