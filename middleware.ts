import { NextRequest, NextResponse } from "next/server";
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/next";

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({ mode: "LIVE", allow: [] }),
    slidingWindow({ mode: "LIVE", interval: 60, max: 100 }),
  ],
});

// Arcjet middleware untuk semua requests
async function arcjetMiddleware(request: NextRequest) {
  const decision = await aj.protect(request);

  if (decision.isDenied()) {
    console.log("Arcjet blocked request:", decision.reason);

    if (decision.reason.isRateLimit()) {
      return NextResponse.json({ error: "Too Many Requests" }, { status: 429 });
    } else if (decision.reason.isBot()) {
      return NextResponse.json({ error: "Bot Detected" }, { status: 403 });
    } else {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  return null; // Continue to next middleware
}

export default withAuth(
  async function middleware(request: NextRequestWithAuth) {
    // Apply Arcjet protection first
    const arcjetResponse = await arcjetMiddleware(request);
    if (arcjetResponse) return arcjetResponse;

    const token = request.nextauth.token;
    const path = request.nextUrl.pathname;

    // If no token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Check for admin dashboard access
    if (path.startsWith("/dashboard")) {
      if (!token.user) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    // Check for users page access (admin/super admin only)
    if (path.startsWith("/users")) {
      if (token.user?.role !== "Admin" && token.user?.role !== "Super Admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // If no token, redirect to login
        if (!token) {
          return false;
        }

        // For now, just check if token exists
        // Role-based checks will be handled in the middleware function
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/users/:path*",
    "/api/:path*", // Protect API routes dengan Arcjet
  ],
};
