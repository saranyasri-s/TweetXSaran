import React, { useState } from "react";
import classes from "./SignUp.module.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebase";
import axios from "axios";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
function SignUp() {
  const [name, setname] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setpassword] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPwdError, setConfirmPwdError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

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

  const isConfirmPasswordValid = (confirmPassword) => {
    const isValid = confirmPassword === password;
    setConfirmPwdError(
      isValid ? "" : "Confirm password should match the password"
    );
    return isValid;
  };
  const isNameValid = (name) => {
    const isValid = name.length > 0;
    setNameError(isValid ? "" : "Enter valid Name");
    return isValid;
  };
  // Update state and validate on input change
  const handleNameChange = (event) => {
    setname(event.target.value);
    isNameValid(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    isEmailValid(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setpassword(event.target.value);
    isPasswordValid(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    isConfirmPasswordValid(event.target.value);
  };

  const validateForm = () => {
    const isNameValidResult = isNameValid(name);
    const isEmailValidResult = isEmailValid(email);
    const isPasswordValidResult = isPasswordValid(password);
    const isConfirmPasswordValidResult =
      isConfirmPasswordValid(confirmPassword);

    setIsFormValid(
      isNameValidResult &&
        isEmailValidResult &&
        isPasswordValidResult &&
        isConfirmPasswordValidResult
    );

    return (
      isNameValidResult &&
      isEmailValidResult &&
      isPasswordValidResult &&
      isConfirmPasswordValidResult
    );
  };

  const handleSignUp = () => {
    if (validateForm()) {
      const signUpUser = async (name, email, password) => {
        // try {
        //   const response = await axios.post(
        //     "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBG1YDW2RDiPI3tcvtZ8jGZMm6FcGGU50U",
        //     {
        //       email: email,
        //       password: password,
        //       returnSecureToken: true,
        //     }
        //   );

        //   // Handle the response or perform additional actions if needed
        //   console.log("User signed up successfully:", response.data);
        // } catch (error) {
        //   // Handle errors, e.g., display an error message to the user
        //   console.error(
        //     "Error signing up user:",
        //     error.response.data.error.message
        //   );
        // }
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const additionalUserInfo = {
            displayName: name, // Replace with the user's name
            // You can add more additional information as needed
          };

          // Update the user's profile with the additional information
          await updateProfile(userCredential.user, additionalUserInfo);

          console.log("User created successfully:", userCredential.user);
          console.log(userCredential);
        } catch (error) {
          console.log(error);
        }
        // try {
        //   const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        //   console.log('User created successfully:', userCredential.user);
        // } catch (error) {
        //   console.error('Error creating user:', error.message);
        // }
      };
      signUpUser(name, email, password);
    } else {
      console.log("Invalid form");
    }
  };

  return (
    <div className={classes.SignUp}>
      <h2>Create Account</h2>
      <input
        className={classes.input}
        type="text"
        name="name"
        value={name}
        placeholder="Name"
        onChange={handleNameChange}
      ></input>
      {nameError && <p className={classes.errMsg}>{nameError}</p>}
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
      <input
        className={classes.input}
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        placeholder="Confirm Password"
        onChange={handleConfirmPasswordChange}
      ></input>
      {confirmPwdError && <p className={classes.errMsg}>{confirmPwdError}</p>}
      <button className={classes.SignUpButton} onClick={handleSignUp}>
        SignUp
      </button>
    </div>
  );
}

export default SignUp;
