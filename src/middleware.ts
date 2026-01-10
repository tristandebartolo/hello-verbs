import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Ignore socket.io requests silently (from VSCode extensions)
  if (request.nextUrl.pathname.startsWith("/socket.io")) {
    return new NextResponse(null, { status: 204 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/socket.io/:path*",
};
