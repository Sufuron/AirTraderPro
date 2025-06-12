// src/firebase.js (Example - use YOUR config from the console!)
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // <-- Import Firestore
import { getStorage } from 'firebase/storage'; // <-- Import Storage

// Your web app's Firebase configuration (REPLACE with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyD4IUefTEBmTPUHxqzOddnKZm4sGGbWGEA",
  authDomain: "aviacion360-7a463.firebaseapp.com",
  projectId: "aviacion360-7a463",
  storageBucket: "aviacion360-7a463.appspot.com",
  messagingSenderId: "972139427481",
  appId: "1:972139427481:web:4edb85c5e677a49fabaa08",
  measurementId: "G-2ZCPNE6WRJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Get a reference to the services
const db = getFirestore(app); // <-- Get Firestore instance
const storage = getStorage(app); // <-- Get Storage instance

// Export the services so you can use them in other parts of your app
export { db, storage };
