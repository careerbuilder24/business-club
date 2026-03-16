
// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import { supabase } from "@/lib/supabaseClient";
// import db from "@/lib/db";

// const SECRET = process.env.JWT_SECRET!;

// export async function POST(req: Request) {
//   try {
//     const { email, password } = await req.json();
//     let user: any = null;

//     //  Try Supabase first
//     const { data: supaUsers } = await supabase
//       .from("users")
//       .select("*")
//       .eq("email", email)
//       .limit(1);

//     if (supaUsers && supaUsers.length > 0) {
//       user = supaUsers[0];
//     } else {
//       //  Local DB fallback
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

//     //  Verify password
//     const valid = await bcrypt.compare(password, user.password);
//     if (!valid) {
//       return NextResponse.json(
//         { message: "Invalid email or password" },
//         { status: 400 }
//       );
//     }

//     //  Create JWT
//     const token = jwt.sign(
//       { id: user.id, email: user.email, role: user.role },
//       SECRET,
//       { expiresIn: "7d" }
//     );

//     //  Set Cookie
//     const res = NextResponse.json({
//       message: "Login successful",
//       user,
//       clientToken: token, // For frontend decoding
//     });

//     res.cookies.set("token", token, {
//       httpOnly: true,
//       path: "/",
//       maxAge: 60 * 60 * 24 * 7,
//     });

//     return res;
//   } catch (err) {
//     console.error("Login API error:", err);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabaseClient";
import db from "@/lib/db";
import { loginLimiter } from "@/lib/rateLimiter";

const SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // 🚫 Rate limit check
    const { success } = await loginLimiter.limit(ip);

    if (!success) {
      return NextResponse.json(
        { message: "Too many login attempts. Try again later." },
        { status: 429 }
      );
    }

    const { email, password } = await req.json();

    let user: any = null;

    // 1️⃣ Supabase check
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
        await new Promise((r) => setTimeout(r, 1000));
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
      await new Promise((r) => setTimeout(r, 1000));
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

    // 5️⃣ Response
    const res = NextResponse.json({
      message: "Login successful",
      user,
      clientToken: token,
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err) {
    console.error("Login API error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}