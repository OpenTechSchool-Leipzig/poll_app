// Here is all code related to the admin Role cloud functions

exports.addAdminRole = functions.https.onCall((data, context) => {
  if (context.auth.token.admin !== true) {
    return {
      error: 'only admins can promote users',
    };
  }
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

function updateUserDoc(uid) {
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
