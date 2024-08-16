importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyAK-3qHXwRcnpUun6ewn7Mkf5S7xgbhNJo",
  authDomain: "graun-2024.firebaseapp.com",
  projectId: "graun-2024",
  storageBucket: "graun-2024.appspot.com",
  messagingSenderId: "315664319466",
  appId: "1:315664319466:web:e485bbb0ef6aad12a52893",
  measurementId: "G-7PC4S7XZ9R"
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
