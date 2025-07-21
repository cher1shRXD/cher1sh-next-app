import { NextRequest, NextResponse } from "next/server";
import { isTokenExpired } from "./shared/utils/is-token-expired";

const middleware = async (req: NextRequest) => {
  try {
    const { pathname } = req.nextUrl;

    if (
      pathname.startsWith("/api/") ||
      pathname.startsWith("/login") ||
      pathname.startsWith("/signup")
    ) {
      return NextResponse.next();
    }

    const accessToken = req.cookies.get("accessToken")?.value;
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if(!accessToken) {
      return NextResponse.next();
    }

    if (isTokenExpired(accessToken)) {
      if (!refreshToken) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      const refreshResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reissue`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (!refreshResponse.ok) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        await refreshResponse.json();

      const res = NextResponse.next();

      res.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        maxAge: 60 * 5,
        secure: process.env.NODE_ENV === "production",
      });
      res.cookies.set("refreshToken", newRefreshToken, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30,
        secure: process.env.NODE_ENV === "production",
      });

      return res;
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
};

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

export default middleware;
