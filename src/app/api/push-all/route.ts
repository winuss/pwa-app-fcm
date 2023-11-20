import { getDeviceTokens } from "@/lib/device-token-db";
import firebaseAdmin from "@/lib/firebase-admin-sdk";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { title, body, icon, image, click_action } = reqBody;
  const tokens = await getDeviceTokens();

  // const message = {
  //   token: tokens,
  //   webpush: {
  //     notification: {
  //       title: "전체 메시지",
  //       body: "전체 메시지 내용",
  //       image: "/icons/icon-192.png",
  //     },
  //     data: {
  //       image: "https://capa.ai/static/services/cnc.jpg",
  //     },
  //     fcm_options: {
  //       link: "https://capa.ai/partners",
  //     },
  //   },
  // };

  const message = {
    tokens,
    data: {
      title,
      body,
      icon,
      image,
      click_action,
    },
  };

  console.log("🚀🚀🚀 FCM Send Message 🚀🚀🚀\n", message);

  const response = await firebaseAdmin.messaging().sendMulticast(message);

  if (response.failureCount > 0) {
    const failedTokens: any[] = [];
    response.responses.forEach((resp: any, idx: number) => {
      if (!resp.success) {
        failedTokens.push(tokens[idx]);
      }
    });
    console.log("[INFO] : Failure tokens: " + failedTokens);
  }

  return NextResponse.json({
    success: true,
    message: `success : ${response.successCount}, failure : ${response.failureCount}`,
  });
}
