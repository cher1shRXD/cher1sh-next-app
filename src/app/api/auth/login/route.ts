import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import { errorResponse } from "@/shared/utils/error-response";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, body);

    const cookieStore = await cookies();

    cookieStore.set("refreshToken", res.data.refreshToken, {
      httpOnly: true,
      secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    cookieStore.set("accessToken", res.data.accessToken, {
      httpOnly: true,
      secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 5,
    });

    return NextResponse.json({ accessToken: res.data.accessToken }, { status: res.status });;
  } catch (e) {
    return errorResponse(e as AxiosError);
  }
};
