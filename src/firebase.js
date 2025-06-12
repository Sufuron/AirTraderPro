// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Firebase configuration is read from Vite environment variables
// Ensure your .env file has these correctly set!
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID, // Optional depending on usage
};

// It's good to still warn about missing variables during development
const missingVars = Object.entries(firebaseConfig)
  .filter(([, v]) => !v)
  .map(([k]) => k);
if (missingVars.length) {
  console.warn(
    `Firebase config missing values: ${missingVars.join(', ')}. ` +
      'Check your .env file and build process.'
  );
  // Depending on how critical Firebase is, you might even throw an error here
  // throw new Error(`Missing Firebase config: ${missingVars.join(', ')}`);
}


// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Get service instances
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app); // This will now always attempt to initialize

console.log("Firebase initialization attempted."); // Log even if config is missing, warning above covers it.

// Export the initialized services
export { app, db, storage, auth };

