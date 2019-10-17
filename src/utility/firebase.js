// helper functions that handle firebase connection
import firebase from 'firebase';

firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  databaseURL: process.env.VUE_APP_FIREBASE_DB_URL,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MS_ID,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
});

export const auth = firebase.auth();
export const functions = firebase.functions();

export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();
export const getTimestamp = date => {
  return firebase.firestore.Timestamp.fromMillis(date);
};

export const getUserId = () => {
  return auth.currentUser.uid;
};

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
export async function addData(collection, payload) {
  // override local timestamp

  const res = await firebase
    .firestore()
    .collection(collection)
    .add({ ...payload, createdAt: serverTimestamp });
  try {
    return res.id;
  } catch (err) {
    throw err;
  }
}

// Update specific Data: collection + id -> update
export async function updateData(collection, document, payload) {
  // const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  // const userId = firebase.auth().currentUser.uid;
  await firebase
    .firestore()
    .collection(collection)
    .doc(document)
    .update({ ...payload, updatedAt: serverTimestamp });
  try {
    console.log('Successfully updated: ' + payload.title);
  } catch (err) {
    throw err;
  }
}

// Remove Data from collection
export async function deleteData(collection, id) {
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
// Add Data to Array and create new document if not allready existing
export async function addToArray(collection, id, array, value) {
  // as it is only used for user input the timestamp doesn't need to be set in the vuex store
  await firebase
    .firestore()
    .collection(collection)
    .doc(id)
    .set(
      {
        [array]: firebase.firestore.FieldValue.arrayUnion(value),
        updatedAt: serverTimestamp,
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
  // as it is only used for user creation the timestamp doesn't need to be set in the vuex store
  await firebase
    .firestore()
    .collection(collection)
    .doc(document)
    .set({ ...payload, createdAt: serverTimestamp });
  try {
    console.log('added to ' + collection + ' with id: ' + document);
  } catch (err) {
    throw err;
  }
}
