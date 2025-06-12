import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
// Removed: import { auth } from './firebase'; // No longer needed - you're defining it here!

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

// --- Your excellent logging and check for missing variables ---
const missingVars = Object.entries(firebaseConfig)
  .filter(([, v]) => !v)
  .map(([k]) => k);
if (missingVars.length) {
  console.warn(
    `Firebase config missing values: ${missingVars.join(', ')}. ` +
      'Check your .env file.'
  );
}

const requiredVars = ['apiKey', 'authDomain', 'projectId', 'appId'];
const missingRequired = requiredVars.filter((k) => !firebaseConfig[k]);
// -------------------------------------------------------------

let app = undefined; // Initialize with undefined explicitly
let db = undefined;
let storage = undefined;
let auth = undefined;

if (!missingRequired.length) {
  // Initialize Firebase ONLY when the required config is present
  try {
      app = initializeApp(firebaseConfig);
      db = getFirestore(app);
      storage = getStorage(app);
      auth = getAuth(app);
      console.log("Firebase initialized successfully!"); // Optional: log success
  } catch (error) {
      console.error("Failed to initialize Firebase:", error);
      // You might want to handle this failure state more explicitly in your app
      // if initialization is critical.
  }
} else {
    console.error("Firebase initialization skipped due to missing required config.");
    // Ensure your app handles cases where auth, db, storage are undefined
}


// **Add this export statement!**
// This makes 'app', 'db', 'storage', and 'auth' available when other files import from './firebase'
export { app, db, storage, auth };

