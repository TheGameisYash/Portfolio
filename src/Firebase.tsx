import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCYsfLS21ilXxv5lN3cNLOxFOapx7NDLXE",
  authDomain: "portfolio-780be.firebaseapp.com",
  projectId: "portfolio-780be",
  storageBucket: "portfolio-780be.appspot.com",
  messagingSenderId: "441766573270",
  appId: "1:441766573270:web:66dcf0f3df5cf4306ec577"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);