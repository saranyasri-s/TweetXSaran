import React, { useState, useEffect } from "react";
import classes from "./Login.module.css";
import axios from "axios";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";

import { collection, getDocs } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase"; // Adjust the path to your firebase.js file
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../store/UserSlice";
function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setpassword] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [uid, setUid] = useSelector((state) => state.user.uid);
  const [isFormValid, setIsFormValid] = useState(false);
  const dispatch = useDispatch();
  // Validation functions
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setEmailError(isValid ? "" : "Enter valid email");
    return isValid;
  };

  const isPasswordValid = (password) => {
    const isValid = password.length >= 6;
    setPwdError(isValid ? "" : "Password must be at least 6 characters");
    return isValid;
  };

  // Update state and validate on input change

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    isEmailValid(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setpassword(event.target.value);
    isPasswordValid(event.target.value);
  };

  const validateForm = () => {
    const isEmailValidResult = isEmailValid(email);
    const isPasswordValidResult = isPasswordValid(password);

    setIsFormValid(isEmailValidResult && isPasswordValidResult);

    return isEmailValidResult && isPasswordValidResult;
  };

  const handleLogin = () => {
    if (validateForm()) {
      const loginUser = async (email, password) => {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          console.log("User logged in successfully");
          console.log(userCredential);
          const userData = {
            email: userCredential.user.email,
            displayName: userCredential.user.displayName,

            uid: userCredential.user.uid,
          };

          // Dispatch the setUser action with the user data
          dispatch(setUser(userData));

          // const fetchUser = async () => {
          //   try {
          //     const querySnapshot = await getDocs(
          //       collection(db, `users/${userCredential.user.uid}`)
          //     );
          //     console.log(querySnapshot);
          //   } catch (error) {
          //     console.error(
          //       `Error fetching user:${userCredential.user.uid}1`,
          //       error.message
          //     );
          //   }
          // };
          // fetchUser();
          // try {
          //   const userDocRef = doc(db, "users", userCredential.user.uid);
          //   const userDoc = await getDoc(userDocRef);

          //   if (userDoc.exists()) {
          //     const userData = { uid: userDoc.id, ...userDoc.data() };
          //     console.log("Fetched user data:", userData);
          //     // Dispatch the setUser action with the userData
          //   } else {
          //     console.error("User document not found");
          //   }
          // } catch (error) {
          //   console.error("Error fetching user:", error.message);
          // }
          // const userData = {
          //   email: 'example@email.com',
          //   displayName: 'John Doe',
          //   posts: [],
          //   following: [],
          //   followers: [],
          //   uid: '123',
          // };

          // // Dispatch the setUser action with the user data
          // dispatch(setUser(userData));

          setEmail("");
          setEmailError("");
          setpassword("");
          setPwdError("");
        } catch (error) {
          console.error("Error logging in:", error.message);
        }
        // try {
        //   const response = await axios.post(
        //     "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBG1YDW2RDiPI3tcvtZ8jGZMm6FcGGU50U",
        //     {
        //       email: email,
        //       password: password,
        //       returnSecureToken: true,
        //     }
        //   );

        //   // Handle the response or perform additional actions if needed
        //   console.log("User logged in successfully:", response.data);
        // } catch (error) {
        //   // Handle errors, e.g., display an error message to the user
        //   console.error(
        //     "Error logging in user:",
        //     error.response.data.error.message
        //   );
        // }
      };
      loginUser(email, password);
    } else {
      console.log("Invalid form");
    }
  };

  return (
    <div className={classes.SignUp}>
      <h2>Login</h2>
      <input
        className={classes.input}
        type="email"
        name="email"
        value={email}
        placeholder="Email"
        onChange={handleEmailChange}
      ></input>
      {emailError && <p className={classes.errMsg}>{emailError}</p>}
      <input
        className={classes.input}
        type="password"
        name="password"
        value={password}
        placeholder="Password"
        onChange={handlePasswordChange}
      ></input>
      {pwdError && <p className={classes.errMsg}>{pwdError}</p>}
      <button className={classes.SignUpButton} onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;
