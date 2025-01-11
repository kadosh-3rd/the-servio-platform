import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import type { SessionData } from "@/lib/session";

// Define public routes that don't require authentication
const publicRoutes = [
  "/",
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
];

const sessionOptions = {
  password:
    process.env.SESSION_SECRET ||
    "complex_password_at_least_32_characters_long",
  cookieName: "wermi_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
  },
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthPage = pathname.startsWith("/auth");
  const isSetupPage = pathname.startsWith("/setup");
  const isPublicRoute = publicRoutes.includes(pathname);

  console.log("Middleware - Path:", pathname);

  // Allow access to public routes without checking session
  if (isPublicRoute) {
    console.log("Middleware - Public route, allowing access");
    return NextResponse.next();
  }

  // Get the session
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  console.log("Middleware - Session exists:", !!session.isLoggedIn);

  // Require authentication for protected routes
  if (!session.isLoggedIn && !isAuthPage) {
    console.log("Middleware - No session, redirecting to login");
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // If logged in and trying to access auth pages
  if (session.isLoggedIn && isAuthPage && pathname !== "/auth/role") {
    console.log("Middleware - Auth page, handling redirection");
    // If user is authenticated and on auth page, redirect to appropriate page
    if (session.role === "OWNER") {
      // Restaurant owners go to setup if first login, otherwise dashboard
      const response = await fetch(
        `${request.nextUrl.origin}/api/auth/check-profile`,
        {
          headers: {
            "x-restaurant-id": session.restaurantId,
          },
        }
      );

      if (response.ok) {
        const { isComplete } = await response.json();
        console.log("Middleware - Profile check:", { isComplete });
        return NextResponse.redirect(
          new URL(isComplete ? "/dashboard" : "/setup", request.url)
        );
      }
    } else if (session.role) {
      // Staff members with roles go directly to dashboard
      console.log("Middleware - Staff with role, redirecting to dashboard");
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      // Users without roles go to role selection
      console.log("Middleware - No role, redirecting to role selection");
      return NextResponse.redirect(new URL("/auth/role", request.url));
    }
  }

  // Add session data to headers for API routes
  const requestHeaders = new Headers(request.headers);
  if (session.isLoggedIn) {
    requestHeaders.set("x-user-id", session.userId);
    requestHeaders.set("x-restaurant-id", session.restaurantId);
    if (session.staffId) requestHeaders.set("x-staff-id", session.staffId);
    if (session.role) requestHeaders.set("x-user-role", session.role);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
