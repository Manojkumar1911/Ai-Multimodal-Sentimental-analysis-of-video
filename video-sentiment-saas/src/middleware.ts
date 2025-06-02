import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check for the session token cookie
  const sessionToken =
    request.cookies.get("next-auth.session-token")?.value ??
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  // Get the current path
  const path = request.nextUrl.pathname;

  // If user is on login page and has a session, redirect to home
  if (path === "/login" && sessionToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is on protected route and has no session, redirect to login
  // if (path === "/" && !sessionToken) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login"],
};