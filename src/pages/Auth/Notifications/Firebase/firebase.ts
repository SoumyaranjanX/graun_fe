import { initializeApp, getApps, getApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyAK-3qHXwRcnpUun6ewn7Mkf5S7xgbhNJo",
    authDomain: "graun-2024.firebaseapp.com",
    projectId: "graun-2024",
    storageBucket: "graun-2024.appspot.com",
    messagingSenderId: "315664319466",
    appId: "1:315664319466:web:e485bbb0ef6aad12a52893",
    measurementId: "G-7PC4S7XZ9R"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const messaging = getMessaging(app);

export const generateToken = async () => {
    const permission = await Notification.requestPermission();
    console.log(permission);
    if (permission === 'granted') {
        const token = await getToken(messaging, { 
            vapidKey: 
                 "BD9Q0H4AdfDKuKH2UmOHJifiNvMeIaezbu0XfxsJVLff6QzPeIQUxMeOF16V4irpmDvaoKJhvRCrpjDMoqaTq1I"
        });
        console.log(token);
        return token;
    }

};
     
