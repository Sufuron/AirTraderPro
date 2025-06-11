import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD4IUefTEBmTPUHxqzOddnKZm4sGGbWGEA",
  authDomain: "aviacion360-7a463.firebaseapp.com",
  projectId: "aviacion360-7a463",
  storageBucket: "aviacion360-7a463.firebasestorage.app",
  messagingSenderId: "972139427481",
  appId: "1:972139427481:web:4edb85c5e677a49fabaa08",
  measurementId: "G-2ZCPNE6WRJ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
