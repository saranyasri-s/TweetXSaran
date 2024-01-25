import React, { useState, useEffect } from "react";
import classes from "./Login.module.css";
import axios from "axios";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
  const [loading, setLoading] = useState(false); // New loading state

  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      setLoading(true);
      const loginUser = async (email, password) => {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

          const userData = {
            email: userCredential.user.email,
            displayName: userCredential.user.displayName,

            uid: userCredential.user.uid,
          };

          // Dispatch the setUser action with the user data
          dispatch(setUser(userData));

          setEmail("");
          setEmailError("");
          setpassword("");
          setPwdError("");
          navigate("/users");
        } catch (error) {
          console.error("Error logging in:", error.message);
        } finally {
          setLoading(false); // Set loading to false after signup attempt (whether successful or not)
        }
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
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}

export default Login;
