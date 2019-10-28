const admin = require('./initFirebase')();

if (process.argv.length !== 3) {
  throw Error('Invalid use of promote. Usage: node promote.js <uid>');
}
const userId = process.argv[2];

function updateUserDoc(uid) {
  admin
    .firestore()
    .collection('users')
    .doc(uid)
    .set({ admin: true }, { merge: true })
    .then(() => {
      console.log('updated firestore user document');
      process.exit(0);
    })
    .catch(err => {
      console.log(err);
    });
}

admin
  .auth()
  .setCustomUserClaims(userId, {
    admin: true,
  })
  .then(() => {
    console.log(`User ${userId} has been given admin role`);
    updateUserDoc(userId);
  })
  .catch(err => {
    console.log('Failed to grant user admin role: ' + err);
    process.exit(1);
  });
