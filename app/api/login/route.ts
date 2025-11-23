
// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import { supabase } from "@/lib/supabaseClient";
// import db from "@/lib/db"; // your local DB connection

// const SECRET = process.env.JWT_SECRET!;

// export async function POST(req: Request) {
//   try {
//     const { email, password } = await req.json();
//     let user: any = null;

//     // 1️⃣ Try Supabase
//     const { data: supaUsers } = await supabase
//       .from("users")
//       .select("*")
//       .eq("email", email)
//       .limit(1);

//     if (supaUsers && supaUsers.length > 0) {
//       user = supaUsers[0];
//     } else {
//       // 2️⃣ Fallback to local DB
//       const [rows]: any = await db.query(
//         "SELECT * FROM users WHERE email = ? LIMIT 1",
//         [email]
//       );

//       if (!rows || rows.length === 0) {
//         return NextResponse.json(
//           { message: "Invalid email or password" },
//           { status: 400 }
//         );
//       }
//       user = rows[0];
//     }

//     // 3️⃣ Check password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return NextResponse.json(
//         { message: "Invalid email or password" },
//         { status: 400 }
//       );
//     }

//     // 4️⃣ Generate JWT
//     const token = jwt.sign(
//       { id: user.id, email: user.email, role: user.role },
//       SECRET,
//       { expiresIn: "7d" }
//     );

//     // 5️⃣ Set httpOnly cookie for middleware
//     const response = NextResponse.json({
//       message: "Login successful",
//       user,
//       clientToken: token,
//     });

//     response.cookies.set("token", token, {
//       httpOnly: true,
//       path: "/",
//       maxAge: 7 * 24 * 60 * 60,
//     });

//     return response;
//   } catch (error) {
//     console.error("Login API error:", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabaseClient";
import db from "@/lib/db";

const SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    let user: any = null;

    // 1️⃣ Try Supabase first
    const { data: supaUsers } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .limit(1);

    if (supaUsers && supaUsers.length > 0) {
      user = supaUsers[0];
    } else {
      // 2️⃣ Local DB fallback
      const [rows]: any = await db.query(
        "SELECT * FROM users WHERE email = ? LIMIT 1",
        [email]
      );

      if (!rows || rows.length === 0) {
        return NextResponse.json(
          { message: "Invalid email or password" },
          { status: 400 }
        );
      }
      user = rows[0];
    }

    // 3️⃣ Verify password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }

    // 4️⃣ Create JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET,
      { expiresIn: "7d" }
    );

    // 5️⃣ Set Cookie
    const res = NextResponse.json({
      message: "Login successful",
      user,
      clientToken: token, // For frontend decoding
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err) {
    console.error("Login API error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
