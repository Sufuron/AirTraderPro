import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
      "Check your .env file."

let app;
let db;
let storage;
let firebaseAuth;
if (!missingVars.length) {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  // Get a reference to the services
  db = getFirestore(app);
  storage = getStorage(app);
  firebaseAuth = getAuth(app);
}
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
