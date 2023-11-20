"use client";
import { useEffect, useState } from "react";
import { httpClient } from "../service/http-client";
import { tempMessage } from "../service/temp-data";

export default function SendPush() {
  const [data, setData] = useState<string[]>([]);

  //default
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [link, setLink] = useState("");
  const [icon, setIcon] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await httpClient.get("api/device-token");
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    setTitle(tempMessage.title);
    setBody(tempMessage.body);
    setLink(tempMessage.click_action);
    setIcon(tempMessage.icon);
    setImage(tempMessage.image);
  }, []);

  const initDB = async () => {
    const response = await httpClient.post("api/device-token");
    setData(response.data);
  };

  const refreshDB = async () => {
    const response = await httpClient.get("api/device-token");
    setData(response);
  };

  const sendPush = async (token: string) => {
    const response = await httpClient.post("api/push", {
      deviceToken: token,
      title: title,
      body: body,
      icon: icon,
      image: image,
      click_action: link,
    });

    alert(`${response.success} - ${response.message}`);
  };

  const sendPushAll = async () => {
    const response = await httpClient.post("api/push-all", {
      title: title,
      body: body,
      icon: icon,
      image: image,
      click_action: link,
    });

    alert(`${response.success} - ${response.message}`);
  };

  return (
    <>
      <section>
        <h2>푸시 내용</h2>
        <div className="item">
          title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          body
          <input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          icon
          <input
            type="text"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
          />
          image
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          link
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
      </section>
      <section>
        <h2>푸시 전송</h2>
        <button onClick={() => sendPushAll()}>모두 보내기</button>
      </section>

      <section>
        <div>
          <h2>선택 보내기</h2>
          <button onClick={() => refreshDB()}>새로고침</button>
        </div>
        <span className="empty-h4" />
        <ul className="subslist">
          {data.map((token) => (
            <li key={token}>
              <button onClick={() => sendPush(token)}>Send</button>
              <span className="empty-w4" />
              {`${token.substring(0, 20)}...${token.substring(
                token.length - 20,
                token.length
              )}`}
            </li>
          ))}
        </ul>

        <span className="empty-h4" />
      </section>
      <section>
        <div>
          <button onClick={() => initDB()}>데이터 초기화</button>
          <span className="empty-w4" />
        </div>
      </section>
    </>
  );
}
