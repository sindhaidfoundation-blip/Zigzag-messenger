import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase web-app settings are public client configuration, not admin credentials.
// Environment variables can override these defaults for other build environments.
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "AIzaSyC-z4p01R-1REO6_2O7eDL0ReFMamocKGw",
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || "zigzag-messenger-624a3.firebaseapp.com",
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "zigzag-messenger-624a3",
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || "zigzag-messenger-624a3.firebasestorage.app",
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "526015877871",
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || "1:526015877871:web:de07d3c886689299d9011a"
};

const configured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId);
export const firebaseApp = configured
  ? (getApps().length ? getApp() : initializeApp(firebaseConfig))
  : null;
export const auth = firebaseApp ? getAuth(firebaseApp) : null;
export const firestore = firebaseApp ? getFirestore(firebaseApp) : null;
export const isFirebaseConfigured = configured;
