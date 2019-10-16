function populatePollData(pollData) {
  // get Question Data and populate Poll Data with the related questiondata
  // return populated data
}

function createActivePoll(pollId, pollData) {
  // this function will write the PollData to firestore
  admin
    .firestore()
    .collection('activePolls')
    .doc(pollId)
    .set({ ...pollData, activeSince: serverTimestamp })
    .then(() => {
      return {
        message: 'created activePoll',
      };
    })
    .catch(err => {
      return {
        error: `firestore: ${err}`,
      };
    });
}
