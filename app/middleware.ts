// app/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const role = request.cookies.get("role")?.value;
  const pathname = request.nextUrl.pathname;

  // belum login
  if (!role && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const adminOnly = [
    "/dashboard/users",
    "/dashboard/barang/create",
  ];

  if (
    adminOnly.some((p) => pathname.startsWith(p)) &&
    role !== "admin"
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
