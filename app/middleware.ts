
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";

// const SECRET = process.env.JWT_SECRET!;

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;
//   const url = req.nextUrl.clone();

//   // 1️ Not logged in → redirect
//   if (!token) {
//     url.pathname = "/login";
//     return NextResponse.redirect(url);
//   }

//   try {
//     const payload = jwt.verify(token, SECRET) as { role: string };

//     //  Protect /admin routes
//     if (url.pathname.startsWith("/admin") && payload.role !== "admin") {
//       url.pathname = "/dashboard"; // regular user redirected to dashboard
//       return NextResponse.redirect(url);
//     }

//     //  Optional: Protect /dashboard/admin-only sections
//     // You can check here if you have routes like `/dashboard/manage-users`
//     // and redirect non-admins
//     if (
//       url.pathname.startsWith("/dashboard/manage-users") ||
//       url.pathname.startsWith("/dashboard/admin-settings")
//     ) {
//       if (payload.role !== "admin") {
//         url.pathname = "/dashboard"; // regular users can't access
//         return NextResponse.redirect(url);
//       }
//     }

//     return NextResponse.next();
//   } catch (err) {
//     url.pathname = "/login"; // invalid token → login
//     return NextResponse.redirect(url);
//   }
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/admin/:path*"], // protect these routes
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
    const decoded = jwt.verify(token, SECRET) as { role: "admin" | "user" };

    // If user tries to visit /admin but is NOT admin
    if (decoded.role === "user" && req.nextUrl.pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}


// Apply middleware to dashboard & admin pages
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
