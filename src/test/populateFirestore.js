const firebase = require('firebase');
require('firebase/firestore');

const {reservations, restaurants, dateAvailabilities, reviews } = require('./testData');

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAvcLQQWKVrj3WB19r0ZBrH2fw5UrOV_5o",
    authDomain: "loopnotluck.firebaseapp.com",
    databaseURL: "https://loopnotluck.firebaseio.com",
    projectId: "loopnotluck",
    storageBucket: "loopnotluck.appspot.com",
    messagingSenderId: "628935599881",
    appId: "1:628935599881:web:c5fb80eb8ee180f8e0d5d8",
    measurementId: "G-X4VHFRNTPK"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore(); //reference to firestore to make queries to 

  function populateCollection(collectionName, items){
      return Promise.all(items.map(item => {  //inserting data is async operation hence we need to use Promise, since items.map is a sync operation
          const {id, ...data } = item;
          return db.collection(collectionName)
          .doc(id)
          .set(data);
      }));
  }

  Promise.all([
    populateCollection('reservations', reservations),
    populateCollection('reviews', reviews),
    populateCollection('restaurants', restaurants),
    populateCollection('dateAvailabilities', dateAvailabilities),
  ])
.then(() => {
    console.log('Done!');
    process.exit(0); //this is to terminate the process else it hangs after execution.
})
.catch(err => {
    console.log(err);
});