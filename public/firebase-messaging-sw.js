function log(...args) {
  console.log("service-worker:", ...args);
}

importScripts(
  "https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js"
);

const config = {
  apiKey: "AIzaSyAXZjyDg18rKpTdTldl4pRUn7xEKBf9jwM",
  authDomain: "capa-pwa.firebaseapp.com",
  projectId: "capa-pwa",
  storageBucket: "capa-pwa.appspot.com",
  messagingSenderId: "549380418603",
  appId: "1:549380418603:web:1341e795345391bf854e6e",
};
//Initialize Firebase
firebase.initializeApp(config);
const messaging = firebase.messaging();

//푸시
self.addEventListener("push", async (event) => {
  log("push", { event });

  if (event.data) {
    log("push data", event.data.json());

    // const { data } = event.data.json();
    const data = event.data.json().data;
    log("icon", data.icon);

    const options = {
      body: data.body,
      icon: data.icon ?? "/icons/icon-256.png",
      image: data.image,
      data: {
        click_action: data.click_action, // 이 필드는 밑의 클릭 이벤트 처리에 사용됨
      },
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

/**
 * notificationclick
 */
self.addEventListener("notificationclick", (event) => {
  log("push", { event });
  event.notification.close();
  try {
    const openLink = event.notification.data.click_action;
    self.clients.openWindow(openLink);
  } catch {
    self.clients.openWindow("https://capa.ai");
  }
});
