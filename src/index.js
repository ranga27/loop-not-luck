import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import './index.css';
import { App, serviceWorker } from './app';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

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
firebase.analytics();
 
//Code for emulator
//firebase.functions().useFunctionsEmulator('http://localhost:5051');
// This is where the magic happens. React renders our App component
// inside the div with the id "root"
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
