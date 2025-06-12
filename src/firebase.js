import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Firebase configuration is read from Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Warn if any required variable is missing to help with setup issues
const missingVars = Object.entries(firebaseConfig)
  .filter(([, v]) => !v)
  .map(([k]) => k);
if (missingVars.length) {
  console.warn(
    `Firebase config missing values: ${missingVars.join(", ")}. ` +
    "Check your .env file."
  );
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Get a reference to the services
const db = getFirestore(app);
const storage = getStorage(app);
const firebaseAuth = getAuth(app);

// Export the services so you can use them in other parts of your app
export { db, storage, firebaseAuth as auth };
