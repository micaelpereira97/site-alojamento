// Firebase Configuration and Initialization
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

// Firebase configuration
// Using demo project for emulators
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const functions = getFunctions(app);
export const auth = getAuth(app);

// Connect to emulators if in development mode
const isDevelopment = import.meta.env.MODE === 'development' || window.location.hostname === 'localhost';
const useEmulators = import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true';

if (isDevelopment && useEmulators) {
  console.log('🔧 Connecting to Firebase Emulators...');

  try {
    // Connect to Firestore Emulator
    connectFirestoreEmulator(db, 'localhost', 8080);
    console.log('✅ Firestore Emulator connected on port 8080');

    // Connect to Functions Emulator
    connectFunctionsEmulator(functions, 'localhost', 5001);
    console.log('✅ Functions Emulator connected on port 5001');

    // Connect to Auth Emulator
    connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
    console.log('✅ Auth Emulator connected on port 9099');
  } catch (error) {
    console.warn('⚠️ Error connecting to emulators:', error);
    console.warn('Make sure emulators are running: firebase emulators:start');
  }
} else if (isDevelopment) {
  console.log('🎭 Running in development mode WITHOUT Firebase Emulators');
  console.log('📦 Using MOCK DATA for bookings');
}

export default app;
