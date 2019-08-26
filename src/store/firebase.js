// helper functions that handle firebase connection
import firebase from 'firebase';

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
/*
// Override specific Data: collection + id -> set
export async function OverrideData(collection, document, payload) {
  await firebase
    .firestore()
    .collection(collection)
    .doc(document)
    .set(payload);
  try {
    console.log('Successfully updated: ' + payload.title);
  } catch (err) {
    throw err;
  }
}
*/
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
