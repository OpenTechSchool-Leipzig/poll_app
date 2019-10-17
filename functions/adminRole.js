const setAdminrole = (firebaseInstance, data) => {
  return firebaseInstance
    .auth()
    .setCustomUserClaims(data.userId, {
      admin: true,
    })
    .then(() => {
      updateUserDoc(firebaseInstance, data.userId);
      return {
        message: `User ${data.userId} has been given admin role`,
      };
    })
    .catch(err => {
      return {
        error: `Failed to grant user admin role: ${err}`,
      };
    });
};

function updateUserDoc(firebaseInstance, uid) {
  firebaseInstance
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

module.exports = setAdminrole;
