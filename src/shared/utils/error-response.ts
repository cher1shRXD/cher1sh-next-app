import { AxiosError } from "axios";
import { NextResponse } from "next/server";

export const errorResponse = (e: AxiosError) => {
  return NextResponse.json(e, { status: e.status || 500 });
}