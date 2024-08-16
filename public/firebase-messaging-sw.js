// /// <reference lib="webworker" />
// // Asegúrate de tener esta referencia para TypeScript si usas un editor que soporte TypeScript

importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyAi6e-OhlowlctannaFUeX4TxwaSrDTP8U',
  authDomain: 'graun-5712c.firebaseapp.com',
  projectId: 'graun-5712c',
  storageBucket: 'graun-5712c.appspot.com',
  messagingSenderId: '407852605459',
  appId: '1:407852605459:web:36ebb1bb130d5326b35fe6',
  measurementId: 'G-KGKRYF1KP4',
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png',
  };

  Notification.onclick = function (event) {
    event.preventDefault();
    window.open('https://www.google.com', '_blank');
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
