
// import { NextResponse } from "next/server";
// import  db  from "@/lib/db"; // ensure named export
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import type { RowDataPacket } from "mysql2"; //  import correct type

// // Better: store secret in .env
// const SECRET = process.env.JWT_SECRET || "my_super_secret_key";

// // Define your user type extending RowDataPacket
// interface User extends RowDataPacket {
//   id: number;
//   full_name: string;
//   email: string;
//   password: string;
//   role: string;
//   created_at: string;
// }

// export async function POST(req: Request) {
//   try {
//     const { email, password }: { email: string; password: string } = await req.json();

//     //  Correctly typed query
//     const [rows] = await db.query<User[]>(
//       "SELECT * FROM users WHERE email = ?",
//       [email]
//     );

//     const user = rows[0];

//     if (!user) {
//       return NextResponse.json(
//         { message: "Invalid email or password" },
//         { status: 400 }
//       );
//     }

//     // Compare password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return NextResponse.json(
//         { message: "Invalid email or password" },
//         { status: 400 }
//       );
//     }

//     // Create JWT token
//     const token = jwt.sign(
//       { id: user.id, email: user.email, role: user.role },
//       SECRET,
//       { expiresIn: "7d" }
//     );

//     // Success response
//     return NextResponse.json(
//       { message: "Login successful", token, user },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Login error:", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    const { email, password }: { email: string; password: string } = await req.json();

    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .limit(1);

    if (error) throw error;
    if (!users || users.length === 0) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 400 });
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 400 });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json({ message: "Login successful", token, user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
