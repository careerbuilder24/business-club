
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
