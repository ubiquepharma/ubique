import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"; // npm i jsonwebtoken

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  // List of routes that need authentication
  const protectedPaths = ["/dashboard", "/slider", "/gallery", "/products"];

  // Check if current path is a protected one
  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtected) {
    if (!token) {
      // No token, redirect to login
      return NextResponse.redirect(new URL("/reboots", request.url));
    }

    try {
      // Verify JWT token
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      // Invalid or expired token, redirect to login
      return NextResponse.redirect(new URL("/reboots", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/slider/:path*",
    "/products/:path*",
    "/gallery/:path*",
  ],
};
