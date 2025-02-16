// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

async function getUserRole(token: string): Promise<string | null> {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    return payload.role as string;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const protectedRoutes = [
    "/admin",
    "/staff/doctor",
    "/patient",
    "/staff/receptionist",
  ];

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = request.cookies.get("authToken")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    const role = await getUserRole(token);
    let allowedRoles: string[] = [];

    if (pathname.startsWith("/admin")) {
      allowedRoles = ["ADMIN"];
    } else if (pathname.startsWith("/staff/doctor")) {
      allowedRoles = ["DOCTOR"];
    } else if (pathname.startsWith("/patient")) {
      allowedRoles = ["PATIENT"];
    } else if (pathname.startsWith("/staff/receptionist")) {
      allowedRoles = ["RECEPTIONIST"];
    }

    if (!role || !allowedRoles.includes(role)) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/staff/doctor/:path*",
    "/patient/:path*",
    "/staff/receptionist/:path*",
  ],
};
