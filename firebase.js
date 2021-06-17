import Constants from 'expo-constants';
import * as firebase from 'firebase';
import '@firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB-dAvF2pV6l3DhvLX9-uzaXeqRnzE5dHg",
  authDomain: "tinderforadbd.firebaseapp.com",
  databaseURL: "https://tinderforadbd-default-rtdb.firebaseio.com",
  projectId: "tinderforadbd",
  storageBucket: "tinderforadbd.appspot.com",
  messagingSenderId: "1030422612794",
  appId: "1:1030422612794:web:7c034724ed0c0233591e03",
  measurementId: "G-G3PJXKM91T"
};
firebase.initializeApp(Constants.manifest.extra.firebase);

export default firebase;
