// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAi6e-OhlowlctannaFUeX4TxwaSrDTP8U',
  authDomain: 'graun-5712c.firebaseapp.com',
  projectId: 'graun-5712c',
  storageBucket: 'graun-5712c.appspot.com',
  messagingSenderId: '407852605459',
  appId: '1:407852605459:web:36ebb1bb130d5326b35fe6',
  measurementId: 'G-KGKRYF1KP4',
};

// Initialize Firebase if no apps have been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      const messaging = getMessaging(app);
      getToken(messaging, {
        vapidKey: 'BO-TxtB6Fn7E8m8jW12POEMGoWwbgfLdbK0QN_j45cWEgKyNImExhkbLcN6DMzgrfZwgyAcMzlkElN9xa-i1cfA',
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log('current token:', currentToken);
          } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
          }
        })
        .catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
        });
    } else {
      console.log('Unable to get permission to notify.');
    }
  });
}

requestPermission();
