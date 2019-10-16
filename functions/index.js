const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// TODO: split the cloud functions code to make it cleaner!

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

exports.updateState = functions.firestore.document('polls/{pollId}').onUpdate((change, context) => {
  const newValue = change.after.data();

  // ...or the previous value before this update
  const previousValue = change.before.data();

  // access a particular field as you would any JS property
  if (newValue.state !== previousValue.state) {
    console.log(
      'changed state on ' +
        newValue.title +
        '   from: ' +
        previousValue.state +
        '   to: ' +
        newValue.state
    );
  }

  // perform desired operations ...
});
