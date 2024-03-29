// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/storage";
// const firebaseConfig = {
//   apiKey: "AIzaSyBG1YDW2RDiPI3tcvtZ8jGZMm6FcGGU50U",
//   authDomain: "tweetx-23df5.firebaseapp.com",
//   projectId: "tweetx-23df5",
//   storageBucket: "tweetx-23df5.appspot.com",
//   messagingSenderId: "736755758222",
//   appId: "1:736755758222:web:ae666a0c99cc45553705df",
// };

// export const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// export const auth = getAuth(app);
// export const firestore = getStorage(app);

// // import firebase from "firebase/app";
// // import "firebase/auth";
// // import "firebase/firestore";

// // const firebaseConfig = {
// //   apiKey: "AIzaSyBG1YDW2RDiPI3tcvtZ8jGZMm6FcGGU50U",
// //   authDomain: "tweetx-23df5.firebaseapp.com",
// //   projectId: "tweetx-23df5",
// //   storageBucket: "tweetx-23df5.appspot.com",
// //   messagingSenderId: "736755758222",
// //   appId: "1:736755758222:web:ae666a0c99cc45553705df",
// // };

// // firebase.initializeApp(firebaseConfig);

// // export const auth = firebase.auth();
// // export const firestore = firebase.firestore();
// // export default firebase;

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBG1YDW2RDiPI3tcvtZ8jGZMm6FcGGU50U",
  authDomain: "tweetx-23df5.firebaseapp.com",
  projectId: "tweetx-23df5",
  storageBucket: "tweetx-23df5.appspot.com",
  messagingSenderId: "736755758222",
  appId: "1:736755758222:web:ae666a0c99cc45553705df",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
