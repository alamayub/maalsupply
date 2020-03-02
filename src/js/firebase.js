import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/database'
import 'firebase/auth'
var firebaseConfig = {
  apiKey: "AIzaSyDSfTHBRvRJVwh7z6lh-tPnDYv3vsSf-tk",
  authDomain: "maalsupply.firebaseapp.com",
  databaseURL: "https://maalsupply.firebaseio.com",
  projectId: "maalsupply",
  storageBucket: "maalsupply.appspot.com",
  messagingSenderId: "331483573770",
  appId: "1:331483573770:web:f7a5817983b2d640f3f9f3",
  measurementId: "G-HFJNV06MGL"
};
const fb = firebase.initializeApp(firebaseConfig);
export default fb