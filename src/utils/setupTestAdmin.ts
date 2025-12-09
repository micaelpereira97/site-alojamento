import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

/**
 * Creates a test admin user if it doesn't exist
 * Only for development/testing purposes
 */
export const setupTestAdmin = async () => {
  const testEmail = 'admin@recanto.pt';
  const testPassword = 'admin123';

  try {
    // Try to create the test user
    await createUserWithEmailAndPassword(auth, testEmail, testPassword);
    console.log('✅ Test admin user created successfully:', testEmail);
    return true;
  } catch (error: any) {
    // If user already exists, that's fine
    if (error.code === 'auth/email-already-in-use') {
      console.log('ℹ️ Test admin user already exists:', testEmail);
      return true;
    }
    console.error('❌ Error creating test admin:', error);
    return false;
  }
};
