import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

export const handler = async (
  req: NextRequest,
  { params }: { params: { proxy: string[] } }
): Promise<NextResponse> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const targetPath = params.proxy.join("/");
  const targetUrl = `${process.env.NEXT_PUBLIC_API_URL}/${targetPath}`;

  const method = req.method.toLowerCase() as
    | "get"
    | "post"
    | "put"
    | "patch"
    | "delete"
    | "options";

  const data = ["get", "head"].includes(method)
    ? undefined
    : await req.json();

  const tryRequest = async (token: string) => {
    const headers: Record<string, string> = {
      ...Object.fromEntries(req.headers.entries()),
      Authorization: `Bearer ${token}`,
      cookie: "",
      host: "",
    };

    if (!data || data instanceof FormData) {
      delete headers["content-type"];
    } else {
      headers["content-type"] = "application/json";
    }

    return axios.request({
      url: targetUrl,
      method,
      headers,
      data,
      validateStatus: () => true,
    });
  };

  if (!accessToken) {
    return NextResponse.json({ message: "No access token" }, { status: 401 });
  }

  try {
    let apiResponse = await tryRequest(accessToken);

    if (apiResponse.status === 401 || apiResponse.status === 419) {
      if (!refreshToken) {
        return NextResponse.json({ message: "No refresh token" }, { status: 401 });
      }

      const reissueResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reissue`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (!reissueResponse.ok) {
        return NextResponse.json({ message: "Token reissue failed" }, { status: 401 });
      }

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        await reissueResponse.json();

      const res = NextResponse.next();
      res.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 5,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });
      res.cookies.set("refreshToken", newRefreshToken, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      apiResponse = await tryRequest(newAccessToken);

      const responseHeaders = new Headers();
      for (const [key, value] of Object.entries(apiResponse.headers)) {
        if (Array.isArray(value)) {
          responseHeaders.set(key, value.join(", "));
        } else if (value !== undefined) {
          responseHeaders.set(key, value.toString());
        }
      }

      responseHeaders.forEach((value, key) => res.headers.set(key, value));

      return new NextResponse(JSON.stringify(apiResponse.data), {
        status: apiResponse.status,
        headers: res.headers,
      });
    }

    const responseHeaders = new Headers();
    for (const [key, value] of Object.entries(apiResponse.headers)) {
      if (Array.isArray(value)) {
        responseHeaders.set(key, value.join(", "));
      } else if (value !== undefined) {
        responseHeaders.set(key, value.toString());
      }
    }

    return new NextResponse(JSON.stringify(apiResponse.data), {
      status: apiResponse.status,
      headers: responseHeaders,
    });
  } catch (e) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
export const OPTIONS = handler;
