const { cloneDeep } = require('lodash');

async function populatePollData(firebaseInstance, newValue, pollId) {
  // get Question Data and populate Poll Data with the related questiondata
  let fetchedQuestions = [];
  try {
    const snapshot = await firebaseInstance
      .firestore()
      .collection('questions')
      .get();
    snapshot.forEach(doc => {
      const data = doc.data();
      data.id = doc.id;
      fetchedQuestions.push(data);
    });
    //using spread operator to remove admin info
    let {
      createdAt,
      createdBy,
      updatedAt,
      updatedBy,
      activatedBy,
      closedAt,
      closedBy,
      ...pollData
    } = cloneDeep(newValue);
    console.log(pollData);

    if (fetchedQuestions.length === 0) {
      throw Error("couldn't fetch question Data");
    }
    const questionObjects = fetchedQuestions
      .filter(x => pollData.questions.includes(x.id))
      .map(x => {
        const { createdAt, createdBy, ...question } = x;
        return question;
      });
    console.log(questionObjects);
    if (questionObjects.length === 0) {
      throw Error("couldn't find Question IDs in Questionlist");
    }
    pollData.questions = questionObjects;

    return createActivePoll(firebaseInstance, pollId, pollData);
  } catch (err) {
    throw err;
  }
}

function createActivePoll(firebaseInstance, pollId, pollData) {
  // this function will write the PollData to firestore
  return new Promise((resolve, reject) => {
    firebaseInstance
      .firestore()
      .collection('activePolls')
      .doc(pollId)
      .set({ ...pollData })
      .then(() => {
        resolve({
          message: 'created activePoll',
        });
        return { message: 'created activePoll' };
      })
      .catch(err => {
        reject(err);
        throw err;
      });
  });
}

function removeActivePoll(firebaseInstance, pollId) {
  return new Promise((resolve, reject) => {
    firebaseInstance
      .firestore()
      .collection('activePolls')
      .doc(pollId)
      .delete()
      .then(() => {
        resolve({
          message: 'deleted activePoll',
        });
        return { message: 'deleted activePoll' };
      })
      .catch(err => {
        reject(err);
        throw err;
      });
  });
}

module.exports.copyToActivePoll = populatePollData;
module.exports.removeFromActivePoll = removeActivePoll;
