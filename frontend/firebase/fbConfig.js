import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDPJOSZ9KnunNP6MMDhj43RcWDZ1A48kkM",
  authDomain: "signify-6c9b8.firebaseapp.com",
  projectId: "signify-6c9b8",
  storageBucket: "signify-6c9b8.firebasestorage.app",
  messagingSenderId: "307055958247",
  appId: "1:307055958247:web:a4184e162d055d135aaa42",
  measurementId: "G-L0V0MVNYPG"
};
const app = initializeApp(firebaseConfig);

// ✅ The correct way to initialize auth with persistence on React Native:
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getFirestore(app);

export { app, db, auth };
