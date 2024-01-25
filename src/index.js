import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBG1YDW2RDiPI3tcvtZ8jGZMm6FcGGU50U",
  authDomain: "tweetx-23df5.firebaseapp.com",
  databaseURL: "https://tweetx-23df5-default-rtdb.firebaseio.com",
  projectId: "tweetx-23df5",
  storageBucket: "tweetx-23df5.appspot.com",
  messagingSenderId: "736755758222",
  appId: "1:736755758222:web:ae666a0c99cc45553705df",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // If you're using authentication
const database = getDatabase(app);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
