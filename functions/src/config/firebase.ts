import * as admin from 'firebase-admin';

// Initialize Firebase Admin
admin.initializeApp();

// Firestore database instance
export const db = admin.firestore();

// Set Firestore settings
db.settings({
  ignoreUndefinedProperties: true,
});

export default admin;
