// helper functions that handle firebase connection
import firebase from 'firebase';

firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  databaseURL: 'https://ots-poll.firebaseio.com',
  storageBucket: 'ots-poll.appspot.com',
  authDomain: 'ots-poll.firebaseapp.com',
  messagingSenderId: process.env.VUE_APP_FIREBASE_MS_ID,
  projectId: 'ots-poll',
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
});

export const auth = firebase.auth();
export const functions = firebase.functions();

// get collection
export async function fetchCollection(collection) {
  const fetchedData = [];
  const snapshot = await firebase
    .firestore()
    .collection(collection)
    .get();
  snapshot.forEach(doc => {
    const data = doc.data();
    data.id = doc.id;
    fetchedData.push(data);
  });
  try {
    return fetchedData;
  } catch (err) {
    throw err;
  }
}
// get Document
export async function fetchDocument(collection, document) {
  const snapshot = await firebase
    .firestore()
    .collection(collection)
    .doc(document)
    .get();
  const data = snapshot.data();
  data.id = snapshot.id;
  console.log(data);
  try {
    return data;
  } catch (err) {
    throw err;
  }
}

// Add Data to collection
export async function AddData(collection, payload) {
  const res = await firebase
    .firestore()
    .collection(collection)
    .add(payload);
  try {
    return res.id;
  } catch (err) {
    throw err;
  }
}

// Update specific Data: collection + id -> update
export async function UpdateData(collection, document, payload) {
  console.log(payload);
  await firebase
    .firestore()
    .collection(collection)
    .doc(document)
    .update(payload);
  try {
    console.log('Successfully updated: ' + payload.title);
  } catch (err) {
    throw err;
  }
}

// Remove Data from collection
export async function DeleteData(collection, id) {
  await firebase
    .firestore()
    .collection(collection)
    .doc(id)
    .delete();
  try {
    console.log('deleted Poll');
  } catch (err) {
    console.log(err);
  }
}
// Add Data to Array and create ne document if not allready existing
export async function AddToArray(collection, id, array, value) {
  await firebase
    .firestore()
    .collection(collection)
    .doc(id)
    .set(
      {
        [array]: firebase.firestore.FieldValue.arrayUnion(value),
      },
      { merge: true }
    );
  try {
    console.log('added ' + value + ' to array:' + array);
  } catch (err) {
    console.log(err);
  }
}

export async function addDataWithId(collection, document, payload) {
  await firebase
    .firestore()
    .collection(collection)
    .doc(document)
    .set(payload);
  try {
    console.log('added to ' + collection + ' with id: ' + document);
  } catch (err) {
    throw err;
  }
}
