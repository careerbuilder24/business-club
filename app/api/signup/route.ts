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
// import { NextResponse } from "next/server";
// import { supabase } from "@/lib/supabaseClient";
// import bcrypt from "bcryptjs";

// export async function POST(req: Request) {
//   try {
//     const { fullName, email, password } = await req.json();

//     // Check if user exists
//     const { data: existing, error: fetchError } = await supabase
//       .from("users")
//       .select("*")
//       .eq("email", email)
//       .limit(1);

//     if (fetchError) throw fetchError;
//     if (existing && existing.length > 0) {
//       return NextResponse.json({ message: "Email already registered" }, { status: 400 });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert user
//     const { error: insertError } = await supabase
//       .from("users")
//       .insert([{ full_name: fullName, email, password: hashedPassword }]);

//     if (insertError) throw insertError;

//     return NextResponse.json({ message: "Signup successful" }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }
// import { NextResponse } from "next/server";
// import { supabase } from "@/lib/supabaseClient"; // optional Supabase client
// import db from "@/lib/db"; // Workbranch/MySQL client
// import bcrypt from "bcryptjs";

// export async function POST(req: Request) {
//   try {
//     const { fullName, email, password } = await req.json();

//     if (!fullName || !email || !password) {
//       return NextResponse.json({ message: "All fields are required" }, { status: 400 });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // --- First try Supabase if URL & KEY exist ---
//     if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
//       const { data: existing, error: fetchError } = await supabase
//         .from("users")
//         .select("*")
//         .eq("email", email)
//         .limit(1);

//       if (fetchError) {
//         console.error("Supabase fetch error:", fetchError);
//         return NextResponse.json({ message: "Server error" }, { status: 500 });
//       }

//       if (existing && existing.length > 0) {
//         return NextResponse.json({ message: "Email already registered" }, { status: 400 });
//       }

//       const { error: insertError } = await supabase
//         .from("users")
//         .insert([{ full_name: fullName, email, password: hashedPassword }]);

//       if (insertError) {
//         console.error("Supabase insert error:", insertError);
//         return NextResponse.json({ message: "Server error" }, { status: 500 });
//       }

//       return NextResponse.json({ message: "Signup successful (Supabase)" }, { status: 200 });
//     }

//     // --- Fallback to Workbranch/MySQL ---
//     const [existing] = await db.query(
//       "SELECT * FROM users WHERE email = ?",
//       [email]
//     );

//     if (Array.isArray(existing) && existing.length > 0) {
//       return NextResponse.json({ message: "Email already registered" }, { status: 400 });
//     }

//     await db.query(
//       "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)",
//       [fullName, email, hashedPassword]
//     );

//     return NextResponse.json({ message: "Signup successful (MySQL)" }, { status: 200 });
//   } catch (error) {
//     console.error("Signup error:", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }

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