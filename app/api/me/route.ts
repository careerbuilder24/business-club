

// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";

// const SECRET = process.env.JWT_SECRET!;

// export async function GET() {
//   try {
//     // ⬅ MUST AWAIT in your Next.js version
//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value;

//     if (!token) {
//       return NextResponse.json({ isAuthenticated: false }, { status: 401 });
//     }

//     const decoded = jwt.verify(token, SECRET) as {
//       id: string;
//       email: string;
//       role: string;
//     };

//     return NextResponse.json({
//       isAuthenticated: true,
//       email: decoded.email,
//       role: decoded.role,
//     });
//   } catch (error) {
//     console.error("Token verification failed:", error);
//     return NextResponse.json(
//       { isAuthenticated: false, error: "Invalid token" },
//       { status: 401 }
//     );
//   }
// }
// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// const SECRET = process.env.JWT_SECRET!;

// export async function GET(req: Request) {
//   try {
//     const token = req.headers.get("cookie")
//       ?.split("; ")
//       .find((c) => c.startsWith("token="))
//       ?.split("=")[1];

//     if (!token) {
//       return NextResponse.json(
//         { message: "No token found" },
//         { status: 401 }
//       );
//     }

//     const decoded = jwt.verify(token, SECRET);

//     return NextResponse.json(decoded);
//   } catch {
//     return NextResponse.json({ message: "Invalid token" }, { status: 401 });
//   }
// }
// app/api/me/route.ts
// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// const SECRET = process.env.JWT_SECRET!;

// export async function GET(req: Request) {
//   try {
//     // Parse token from cookie
//     const token = req.headers.get("cookie")
//       ?.split("; ")
//       .find((c) => c.startsWith("token="))
//       ?.split("=")[1];

//     if (!token) {
//       return NextResponse.json({ message: "No token found" }, { status: 401 });
//     }

//     // Verify JWT and decode user
//     const decoded = jwt.verify(token, SECRET) as { id: number; email: string; role:   "admin" | "user"};

//     return NextResponse.json(decoded);
//   } catch (err) {
//     console.error("JWT error:", err);
//     return NextResponse.json({ message: "Invalid token" }, { status: 401 });
//   }
// }
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export async function GET(req: Request) {
  try {
    const token = req.headers.get("cookie")
      ?.split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ success: false, data: null }, { status: 401 });
    }

    const decoded = jwt.verify(token, SECRET) as { id: number; email: string; role: "admin" | "user"; iat: number; exp: number };

    return NextResponse.json({ success: true, data: decoded });
  } catch (err) {
    console.error("JWT error:", err);
    return NextResponse.json({ success: false, data: null }, { status: 401 });
  }
}
