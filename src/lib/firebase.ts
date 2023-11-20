// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
// import "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXZjyDg18rKpTdTldl4pRUn7xEKBf9jwM",
  authDomain: "capa-pwa.firebaseapp.com",
  projectId: "capa-pwa",
  storageBucket: "capa-pwa.appspot.com",
  messagingSenderId: "549380418603",
  appId: "1:549380418603:web:1341e795345391bf854e6e",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export async function firebaseDeviceToken() {
  try {
    const messaging = getMessaging(firebaseApp);
    const currentToken = await getToken(messaging, {
      vapidKey:
        "BNn-K_rtu6iGPOhzuQQikHh76n2D1Xj_gZ7mYe_4A8Y2APveWsK81R5QHL76zCYcpRCGDAe2QmW71f4GmVCYmbI",
    });

    return currentToken;
  } catch {
    return "";
  }
}

export default firebaseApp;
