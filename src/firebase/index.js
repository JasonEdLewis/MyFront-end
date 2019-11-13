import firebase from 'firebase';
import 'firebase/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyAAigTUiVoUXJaiy1Nlsf_WLv_3c7o__YA",
  authDomain: "mygram-1f15a.firebaseapp.com",
  databaseURL: "https://mygram-1f15a.firebaseio.com",
  projectId: "mygram-1f15a",
  storageBucket: "mygram-1f15a.appspot.com",
  messagingSenderId: "405387735973",
  appId: "1:405387735973:web:5eca7f8f1bb6446328ae4c",
  measurementId: "G-SVW63D3N6R"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
  storage, firebase as default
}






