import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';

// Initialize Firebase Admin
admin.initializeApp();

// Initialize Firestore
const db = admin.firestore();

// CORS middleware
const corsHandler = cors({ origin: true });

// Example API endpoint
export const helloWorld = functions.https.onRequest((request, response) => {
  corsHandler(request, response, () => {
    response.json({ message: "Hello from Firebase Functions!" });
  });
});

// User management endpoint
export const createUser = functions.https.onRequest(async (request, response) => {
  corsHandler(request, response, async () => {
    try {
      const { email, displayName } = request.body;
      
      // Create user in Firebase Auth
      const userRecord = await admin.auth().createUser({
        email,
        displayName,
        password: Math.random().toString(36).slice(-8) // Generate random password
      });

      // Store additional user data in Firestore
      await db.collection('users').doc(userRecord.uid).set({
        email,
        displayName,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        lastLogin: admin.firestore.FieldValue.serverTimestamp()
      });

      response.json({ 
        success: true, 
        userId: userRecord.uid,
        message: "User created successfully" 
      });
    } catch (error) {
      response.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  });
});

// Get user data endpoint
export const getUser = functions.https.onRequest(async (request, response) => {
  corsHandler(request, response, async () => {
    try {
      const { userId } = request.params;
      
      const userDoc = await db.collection('users').doc(userId).get();
      
      if (!userDoc.exists) {
        response.status(404).json({ 
          success: false, 
          error: "User not found" 
        });
        return;
      }

      response.json({ 
        success: true, 
        user: userDoc.data() 
      });
    } catch (error) {
      response.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  });
});

// Update user data endpoint
export const updateUser = functions.https.onRequest(async (request, response) => {
  corsHandler(request, response, async () => {
    try {
      const { userId } = request.params;
      const updateData = request.body;
      
      await db.collection('users').doc(userId).update({
        ...updateData,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      response.json({ 
        success: true, 
        message: "User updated successfully" 
      });
    } catch (error) {
      response.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  });
}); 