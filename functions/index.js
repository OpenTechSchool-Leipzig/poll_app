const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

function updateUserDoc(uid) {
  // somehow I cannot perform any action on the firestore database
  admin
    .firestore()
    .collection('users')
    .doc(uid)
    .set({ admin: true }, { merge: true })
    .then(() => {
      return {
        message: 'updated firestore user document',
      };
    })
    .catch(err => {
      return {
        error: `firestore: ${err}`,
      };
    });
}

exports.addAdminRole = functions.https.onCall((data, context) => {
  if (context.auth.token.admin !== true) {
    return {
      error: 'only admins can promote users',
    };
  }
  console.log(data);
  return admin
    .auth()
    .setCustomUserClaims(data.userId, {
      admin: true,
    })
    .then(() => {
      updateUserDoc(data.userId);
      return {
        message: `User ${data.userId} has been given admin role`,
      };
    })
    .catch(err => {
      return {
        error: `Failed to grant user admin role: ${err}`,
      };
    });
});
