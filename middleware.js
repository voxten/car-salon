import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req });

  // Redirect unauthenticated users to the login page
  if (!token) {
    return NextResponse.redirect(new URL("/login-form", req.url));
  }
  

  // Example: Restrict access to the admin page
  if (req.nextUrl.pathname.startsWith("/admin") && token.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Define the routes to apply the middleware
export const config = {
  matcher: ["/admin/:path*", "/dashboard"], // Add protected routes here
  matcher: ["/my-reservations"],
};
