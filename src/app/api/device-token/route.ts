import {
  getDeviceTokens,
  initFileData,
  saveDeviceToken,
} from "@/lib/device-token-db";
import { NextResponse, NextRequest, userAgent } from "next/server";

//토큰 초기화
export async function POST(request: NextRequest) {
  const data = await initFileData();
  return NextResponse.json({ success: true, data });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  await saveDeviceToken(body.deviceToken);

  console.log("구독 추가", body.deviceToken);

  const { device } = userAgent(request);
  console.log("device", device);

  return NextResponse.json({ success: true, message: "토큰 저장" });
}

export async function GET(_: NextRequest) {
  const tokens = await getDeviceTokens();
  return NextResponse.json(tokens);
}
