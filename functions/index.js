const functions = require('firebase-functions');
const admin = require('firebase-admin');

const setAdminRole = require('./adminRole.js');
const { copyToActivePoll, removeFromActivePoll } = require('./updateState');

admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  if (context.auth.token.admin !== true) {
    return {
      error: 'only admins can promote users',
    };
  }
  return setAdminRole(admin, data);
});

exports.updateState = functions.firestore.document('polls/{pollId}').onUpdate((change, context) => {
  const newValue = change.after.data();
  const previousValue = change.before.data();

  if (newValue.state === previousValue.state) {
    return { message: 'nothing to do here' };
  }

  console.log(
    'changed state on ' +
      newValue.title +
      '   from: ' +
      previousValue.state +
      '   to: ' +
      newValue.state
  );

  if (newValue.state === 'active') {
    return copyToActivePoll(admin, newValue, context.params.pollId)
      .then(res => {
        console.log('created activePoll with id: ' + context.params.pollId);
        return res;
      })
      .catch(err => {
        console.error(err);
        return err;
      });
  }

  if (newValue.state === 'draft') {
    return removeFromActivePoll(admin, context.params.pollId)
      .then(res => {
        console.log('removed activePoll with id: ' + context.params.pollId);
        return res;
      })
      .catch(err => {
        console.error(err);
        return err;
      });
  }

  return { message: 'no action implemented yet' };
});
