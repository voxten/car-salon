import { NextResponse } from "next/server";

export async function middleware(req) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Decode token manually if it's a JWT (or fetch session from API if needed)
  let token;
  try {
    token = JSON.parse(atob(authHeader.split(".")[1])); // Decode JWT payload
  } catch (error) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const { pathname } = req.nextUrl;

  // Restrict access based on role
  if (
      (pathname === "/rent-a-car/create-new" || pathname === "/manage-reservations") &&
      (!token.role || token.role !== "admin")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname === "/my-reservations" && (!token.role || token.role !== "client")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard", "/rent-a-car/create-new", "/my-reservations", "/manage-reservations"],
};
