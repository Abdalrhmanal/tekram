import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of public routes (accessible without authentication)
const publicRoutes = [
  "/login",
  "/forgot-password",
  "/reset-password",
  "/register",
  "/change-password",
  "/contact",
  "/about",
  "/welcome",
  "/privacypolicy",
  "/delete-account"
];


export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check if the route is protected (not public and not guest-viewable)
  const isFullyProtectedRoute = !publicRoutes.includes(path);

  // Get the 'a_user' cookie (which holds the token or user info)
  const authCookie = request.cookies.get("a_user")?.value;

  let isAuthenticated = !!authCookie; // Consider the user authenticated if the cookie exists

  // Case 1: If the user is authenticated and trying to access a public route
  if (isAuthenticated && publicRoutes.includes(path)) {
    // Redirect to the home page
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // Case 2: If trying to access a fully protected route without authentication
  if (isFullyProtectedRoute && !isAuthenticated) {
    // Redirect to the login page
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }



  // For all other cases, proceed with the request
  return NextResponse.next();
}

// Match all routes except those that should be excluded (e.g., API or static files)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
