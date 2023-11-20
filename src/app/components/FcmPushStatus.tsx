"use client";
import { useEffect, useState } from "react";
import { firebaseDeviceToken } from "@/lib/firebase";
import { httpClient } from "../service/http-client";
import { isSupported } from "firebase/messaging";
import Link from "next/link";
import { tempMessage } from "../service/temp-data";

export default function FcmPushStatus() {
  const [deviceToken, setDeviceToken] = useState("");
  const [permission, setPermission] =
    useState<NotificationPermission>("default");
  const [isRequestLoading, setIsRequesLoading] = useState(false);

  const initStatus = async () => {
    const supported = await isSupported();
    if (!supported) {
      alert("FCM Messaging not Supported");
      return;
    }

    const currentPermission = window.Notification.permission;
    //알림 권한 확인
    setPermission(currentPermission);

    if (currentPermission == "granted") {
      setDeviceToken(await firebaseDeviceToken());
    }
  };

  useEffect(() => {
    initStatus();
  }, []);

  const requestToken = async () => {
    setIsRequesLoading(true);
    const receivedPermission = await Notification.requestPermission();

    if (receivedPermission == "granted") {
      const token = await firebaseDeviceToken();
      setDeviceToken(token);

      if (token) {
        const result = await httpClient.put("api/device-token", {
          deviceToken: token,
        });
        alert(result.success);
      }
    } else {
      console.log("User Permission Denied.");
    }

    setIsRequesLoading(false);
  };

  const sendPush = async () => {
    const response = await httpClient.post("api/push", {
      deviceToken,
      ...tempMessage,
    });

    alert(`${response.success} - ${response.message}`);
  };

  return (
    <>
      <section>
        <h2>상태</h2>
        <div className="item">알림 권한: {permission}</div>
        {permission == "denied" ? (
          <div className="item">브라우저 권한 허용 필요</div>
        ) : null}
      </section>
      <section>
        <h2>구독</h2>
        <div>
          {isRequestLoading ? (
            <div>구독처리중...</div>
          ) : (
            <div>
              <button onClick={requestToken}>구독 & 알림허용</button>
              <span className="empty-w4" />
              <button onClick={sendPush}>나에게 보내기</button>
            </div>
          )}
        </div>
        <div className="item">
          <pre id="subscription">{deviceToken}</pre>
        </div>
        <div></div>
      </section>
      <section>
        <Link href="/admin">Admin</Link>
      </section>

      <div className="tooltip">
        <span className="close-btn">X</span>
        <div className="tooltip-content">
          <h3>아이폰이면 홈 화면 추가</h3>
          <p className="center">
            <img src="/images/i_1.png" width="25" height="25" />
            <label>&nbsp;하단 중앙의 &apos;공유&apos; 버튼을 누른다!</label>
          </p>
          <p className="center">
            <img src="/images/i_2.png" width="25" height="25" />
            <label>&nbsp;&apos;홈 화면에 추가&apos;를 누르면 끝!</label>
          </p>
        </div>
      </div>
    </>
  );
}
