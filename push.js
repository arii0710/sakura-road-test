import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getMessaging,
  getToken,
  isSupported,
  onMessage,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-messaging.js";
const config = {
  apiKey: "AIzaSyDcUXkbF4LjYcfrD3y9Mkxe9P_iZrKRjsc",
  authDomain: "sakura-road-test.firebaseapp.com",
  projectId: "sakura-road-test",
  storageBucket: "sakura-road-test.firebasestorage.app",
  messagingSenderId: "794983225607",
  appId: "1:794983225607:web:4c8aba81980ab8976f4da2",
};
const status = document.getElementById("pushStatus");
const button = document.getElementById("enablePush");
const tokenBox = document.getElementById("pushToken");
const app = initializeApp(config);
let messaging;
button.addEventListener("click", async () => {
  button.disabled = true;
  try {
    if (!("Notification" in window) || !("serviceWorker" in navigator))
      throw new Error(
        "通知非対応です。iPhoneではホーム画面から起動してください。",
      );
    const permission = await Notification.requestPermission();
    if (permission !== "granted") throw new Error("通知が許可されていません。");
    if (!(await isSupported()))
      throw new Error("この環境はFCMに対応していません。");
    const registration = await navigator.serviceWorker.register(
      "./firebase-messaging-sw.js",
      { scope: "./" },
    );
    await navigator.serviceWorker.ready;
    if (!messaging) {
      messaging = getMessaging(app);
      onMessage(messaging, (payload) => {
        status.textContent =
          "通知を受信しました：" +
          (payload.notification?.title || "テスト通知");
      });
    }
    const token = await getToken(messaging, {
      serviceWorkerRegistration: registration,
      vapidKey:
        "BEbm33xrbiyrYWY4ScV4SDLSrSeRtDwNYqGNHzNG-6HxuJv4pVYq0mX98nJ0DXvQjjl9JWYegGNaiwZMHRdPemE",
    });
    if (!token) throw new Error("トークンを取得できませんでした。");
    tokenBox.value = token;
    tokenBox.hidden = false;
    status.textContent =
      "接続成功。下のトークンをFirebaseのテスト送信に使用してください。公開しないでください。";
  } catch (e) {
    status.textContent = "接続できません：" + e.message;
  } finally {
    button.disabled = false;
  }
});
