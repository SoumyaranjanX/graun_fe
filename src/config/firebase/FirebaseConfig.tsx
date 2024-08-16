import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAK-3qHXwRcnpUun6ewn7Mkf5S7xgbhNJo",
    authDomain: "graun-2024.firebaseapp.com",
    projectId: "graun-2024",
    storageBucket: "graun-2024.appspot.com",
    messagingSenderId: "315664319466",
    appId: "1:315664319466:web:e485bbb0ef6aad12a52893",
    measurementId: "G-7PC4S7XZ9R"
};

// Initialize Firebase if no apps have been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { auth };
