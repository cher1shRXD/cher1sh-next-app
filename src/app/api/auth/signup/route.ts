import { errorResponse } from "@/shared/utils/error-response";
import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try{
    const body = await req.json();
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, body);
    return NextResponse.json({ success: true, redirectTo: '/login' })
  }catch(e){
    return errorResponse(e as AxiosError);
  }
}