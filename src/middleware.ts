import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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
  "/delete-account",
];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const authCookie = request.cookies.get("a_user")?.value;
  const userDataCookie = request.cookies.get("user_data")?.value;

  const isAuthenticated = !!authCookie;

  let role: string | undefined = undefined;
  if (userDataCookie) {
    try {
      const userData = JSON.parse(decodeURIComponent(userDataCookie));
      role = userData.role;
    } catch {
      role = undefined;
    }
  }

  const isPublicRoute = publicRoutes.includes(path);
  const isProtectedRoute = !isPublicRoute;

  // ✅ إعادة توجيه حسب الدور عند الدخول إلى "/"
  if (isAuthenticated && path === "/") {
    if (role === "host") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else if (role === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url)); // إذا أردت صفحة أخرى
    } else if (role === "user") {
      return NextResponse.redirect(new URL("/privacypolicy", request.url));
    }
  }

  // ✅ إذا المستخدم مسجل دخول ويحاول دخول صفحة عامة
  if (isAuthenticated && isPublicRoute) {
    if (role === "host") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else if (role === "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    } else if (role === "user") {
      return NextResponse.redirect(new URL("/privacypolicy", request.url));
    }
  }

  // ✅ إذا المستخدم غير مسجل ويحاول الدخول إلى صفحة محمية
  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
