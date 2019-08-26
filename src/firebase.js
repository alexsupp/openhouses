import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: 'sideinc-aa3b5.firebaseapp.com',
  databaseURL: 'https://sideinc-aa3b5.firebaseio.com',
  projectId: 'sideinc-aa3b5',
  storageBucket: 'sideinc-aa3b5.appspot.com',
  messagingSenderId: '1024240706972',
  appId: process.env.REACT_APP_FIREBASE_APPID
};
const fire = firebase.initializeApp(firebaseConfig);
export default fire;
