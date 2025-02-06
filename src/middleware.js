import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Redirect unauthenticated users to login page
  if (!token) {
    return NextResponse.redirect(new URL("/login-form", req.url));
  }

  const { pathname } = req.nextUrl;

  // Restrict access to /admin, /dashboard, and /rent-a-car/create-new to admin only
  if (
      (pathname.startsWith("/admin") ||
          pathname === "/dashboard" ||
          pathname === "/rent-a-car/create-new") &&
      (!token.role || token.role !== "admin")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Restrict access to /my-reservations to users only
  if (pathname === "/my-reservations" && (!token.role || token.role !== "client")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Define routes where the middleware should apply
export const config = {
  matcher: ["/admin/:path*", "/dashboard", "/rent-a-car/create-new", "/my-reservations"],
};
