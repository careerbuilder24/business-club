
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";

// const SECRET = process.env.JWT_SECRET!;

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;

//   if (!token) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   try {
//     const decoded = jwt.verify(token, SECRET) as { role: "admin" | "user" };

//     // If user tries to visit /admin but is NOT admin
//     if (decoded.role === "user" && req.nextUrl.pathname.startsWith("/admin")) {
//       return NextResponse.redirect(new URL("/dashboard", req.url));
//     }

//   } catch {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   return NextResponse.next();
// }


// // Apply middleware to dashboard & admin pages
// export const config = {
//   matcher: ["/dashboard/:path*", "/admin/:path*"],
// };
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";

// const SECRET = process.env.JWT_SECRET!;

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;

//   if (!token) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   try {
//     const decoded = jwt.verify(token, SECRET) as {
//       id: number;
//       role: "admin" | "user";
//     };

//     const path = req.nextUrl.pathname;

//     // 🔐 Protect admin routes
//     if (path.startsWith("/admin") && decoded.role !== "admin") {
//       return NextResponse.redirect(new URL("/dashboard", req.url));
//     }

//     // 🔐 Prevent accessing other users' dashboards
//     if (path.startsWith("/dashboard")) {
//       const emailInUrl = path.split("/")[2];
//       // (optional: verify ownership via DB if needed)
//     }

//   } catch {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/admin/:path*"],
// };


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded = jwt.verify(token, SECRET) as {
      id: number;
      email: string;
      role: "admin" | "user";
    };

    const path = req.nextUrl.pathname;

    //  Admin protection
    if (path.startsWith("/admin") && decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    //  Dashboard ownership protection
    if (path.startsWith("/dashboard")) {
      const emailInUrl = path.split("/")[2];

      if (emailInUrl && emailInUrl !== decoded.email) {
        return NextResponse.redirect(
          new URL(`/dashboard/${decoded.email}`, req.url)
        );
      }
    }

  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};