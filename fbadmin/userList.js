const admin = require('firebase-admin');
const serviceAccount = require('./ServiceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ots-poll.firebaseio.com',
});

const details = process.argv[2];

//applied the firebase standard setup with the next page token feature
function listAllUsers(nextPageToken) {
  // List batch of users, 1000 at a time.
  admin
    .auth()
    .listUsers(1000, nextPageToken)
    .then(function(listUsersResult) {
      listUsersResult.users.forEach(function(userRecord, index) {
        const userInfo = userRecord.toJSON();
        const userShortInfo = {
          uid: userInfo.uid,
          email: userInfo.email,
          displayName: userInfo.displayName,
          customClaims: userInfo.customClaims,
        };
        console.log(index + ': ', details === 'all' ? userInfo : userShortInfo);
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken);
      } else {
        process.exit(0);
      }
    })
    .catch(function(error) {
      console.log('Error listing users:', error);
      process.exit(1);
    });
}
// Start listing users from the beginning, 1000 at a time.
listAllUsers();
