import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const role = request.cookies.get("role")?.value;

  const adminOnlyPaths = [
    "/dashboard/users",
    "/dashboard/barang/",
  ];

  // proteksi halaman admin (edit/delete)
  if (
    adminOnlyPaths.some(path =>
      request.nextUrl.pathname.startsWith(path)
    )
  ) {
    if (!role) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};