// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage'; // Import Firebase Storage
import { getAuth } from 'firebase/auth'; // Import Firebase Auth (jeśli planujesz używać autentykacji)
import { getFirestore } from 'firebase/firestore'; // Import Firebase Firestore (jeśli planujesz używać bazy danych)

const firebaseConfig = {
  apiKey: "AIzaSyCjGs7K-YApJeoWwRB5wf7e_S87TD9at40",
  authDomain: "gorskapodwozkafoto.firebaseapp.com",
  projectId: "gorskapodwozkafoto",
  storageBucket: "gorskapodwozkafoto.firebasestorage.app",
  messagingSenderId: "9837378118",
  appId: "1:9837378118:web:226e1d52d6639c2a19e847",
  measurementId: "G-525JDKWSJX"
};

// Inicjalizacja Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
const storage = getStorage(app);  // Firebase Storage
const auth = getAuth(app);        // Firebase Authentication (opcjonalnie)
const db = getFirestore(app);     // Firebase Firestore (opcjonalnie)

export { storage, auth, db };
