const admin = require('firebase-admin');
const serviceAccount = require('./ServiceAccountKey.json');
require('dotenv').config();

function initFirebase() {
  try {
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DB_URL,
    });
  } catch (err) {
    throw err;
  }
}

module.exports = initFirebase;
