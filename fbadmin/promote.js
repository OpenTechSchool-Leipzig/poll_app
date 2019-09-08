const admin = require('firebase-admin');
const serviceAccount = require('./ServiceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ots-poll.firebaseio.com',
});

if (process.argv.length !== 3) {
  throw Error('Invalid use of promote. Usage: node promote.js <uid>');
}
const userId = process.argv[2];

admin
  .auth()
  .setCustomUserClaims(userId, {
    admin: true,
  })
  .then(() => {
    console.log(`User ${userId} has been given admin role`);
    process.exit(0);
  })
  .catch(err => {
    console.log('Failed to grant user admin role: ' + err);
    process.exit(1);
  });
