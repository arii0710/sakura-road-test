importScripts('https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.10.0/firebase-messaging-compat.js');
const config = {apiKey: "AIzaSyDcUXkbF4LjYcfrD3y9Mkxe9P_iZrKRjsc", authDomain: "sakura-road-test.firebaseapp.com", projectId: "sakura-road-test", storageBucket: "sakura-road-test.firebasestorage.app", messagingSenderId: "794983225607", appId: "1:794983225607:web:4c8aba81980ab8976f4da2"};
firebase.initializeApp(config);
firebase.messaging();
