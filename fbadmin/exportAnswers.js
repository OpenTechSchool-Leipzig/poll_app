//const admin = require('firebase-admin');
//const serviceAccount = require('./ServiceAccountKey.json');
const fs = require('fs');
require('dotenv').config();
/* try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DB_URL,
  });
} catch (err) {
  throw err;
} */

const admin = require('./initFirebase')();

if (process.argv.length !== 3) {
  throw Error('Invalid use of export. Usage: node exportAnswers.js <pollId>');
}
const pollId = process.argv[2];

exportAnswers(pollId);

function exportAnswers(pollId) {
  admin
    .firestore()
    .collection('answers')
    .doc(pollId)
    .get()
    .then(snapshot => {
      const dataString = JSON.stringify(snapshot.data());
      if (!dataString) {
        throw Error("Couldn't fetch Document.");
      }
      fs.writeFile(`./export/answers_${pollId}.json`, dataString, 'utf8', err => {
        if (err) {
          console.log('An error occured while writing JSON Object to File.');
          console.log(err);
          process.exit(1);
        }

        console.log('JSON file has been saved.');
        process.exit(0);
      });
    })
    .catch(err => {
      console.log(err);
      process.exit(1);
    });
}
