const fs = require('fs');
const admin = require('./initFirebase')();

if (process.argv.length !== 3) {
  throw Error('Invalid use of export. Usage: node exportAnswers.js <pollId>');
}
const pollId = process.argv[2];

exportAnswers();

async function exportAnswers() {
  // get question Data
  const questionsData = await fetchedQuestions();

  // fetch answersData
  admin
    .firestore()
    .collection('answers')
    .doc(pollId)
    .get()
    .then(snapshot => {
      const data = snapshot.data();
      data.pollId = pollId;
      if (!data) {
        throw Error("Couldn't fetch Document.");
      }
      const populatedData = {
        ...data,
        userAnswers: data.userAnswers.map(answerSet =>
          Object.values(answerSet).map(answer => populateQuestionName(answer, questionsData))
        ),
      };
      console.log(populatedData);
      const dataString = JSON.stringify(populatedData);
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

async function fetchedQuestions() {
  // fetch Question Data
  let fetchedQuestions = [];
  try {
    const snapshot = await admin
      .firestore()
      .collection('questions')
      .get();

    snapshot.forEach(doc => {
      const data = doc.data();
      data.id = doc.id;
      fetchedQuestions.push(data);
    });
    if (fetchedQuestions.length === 0) {
      throw Error("couldn't fetch question Data");
    }
    return fetchedQuestions;
  } catch (err) {
    throw err;
  }
}

function populateQuestionName(answer, questionsData) {
  const question = questionsData.find(q => q.id === answer.questionId);
  return {
    ...answer,
    questionName: question.text,
    questionType: question.type,
  };
}
