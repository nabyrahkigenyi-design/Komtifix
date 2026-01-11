import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Map old/short slugs to the new ones
const redirects: Record<string, string> = {
  "/diensten/laminaat": "/diensten/laminaat-leggen",
  "/diensten/vloeren": "/diensten/plavuizen-vloer",
  "/diensten/wc": "/diensten/wc-renovatie",
  "/diensten/timmer": "/diensten/timmerwerk",
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const to = redirects[pathname];
  if (to) {
    const url = req.nextUrl.clone();
    url.pathname = to;
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/diensten/:path*"],
};
