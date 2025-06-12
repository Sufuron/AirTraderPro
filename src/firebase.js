// src/firebase.js (Example - use YOUR config from the console!)
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // <-- Import Firestore
import { getStorage } from 'firebase/storage'; // <-- Import Storage

// Your web app's Firebase configuration (REPLACE with your actual config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "aviacion360-7a463", // <-- Your Project ID
  storageBucket: "YOUR_STORAGE_BUCKET", // <-- Your Storage Bucket
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the services
const db = getFirestore(app); // <-- Get Firestore instance
const storage = getStorage(app); // <-- Get Storage instance

// Export the services so you can use them in other parts of your app
export { db, storage };
