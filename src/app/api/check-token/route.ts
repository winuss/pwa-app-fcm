import { getDeviceTokens } from "@/lib/device-token-db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const body = await request.json();
  const tokens = await getDeviceTokens();

  const token = tokens.find((t) => t === body.deviceToken);

  return NextResponse.json({
    success: token ? true : false,
  });
}
