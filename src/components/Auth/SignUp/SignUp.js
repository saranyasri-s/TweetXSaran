import React, { useState } from "react";
import classes from "./SignUp.module.css";

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

    if (emailRegex.test(email)) {
      setEmailError("");
    } else {
      setEmailError("Enter valid email");
    }
  };

  const isPasswordValid = (password) => {
    if (password.length < 6) {
      setPwdError("Password has to be atleast 6 characters");
    } else {
      setPwdError("");
    }
  };

  const isConfirmPasswordValid = (confirmPassword) => {
    if (confirmPassword === password) {
      setConfirmPwdError("");
    } else {
      setConfirmPwdError("Confirm password should match the password");
    }
  };
  const isNameValid = (name) => {
    if (name.length) {
      setNameError("");
    } else {
      setNameError("Enter valid Name");
    }
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
    isNameValid(name);
    isEmailValid(email);
    isPasswordValid(password);
    isConfirmPasswordValid(confirmPassword);
    setIsFormValid(
      isNameValid(name) &&
        isEmailValid(email) &&
        isPasswordValid(password) &&
        isConfirmPasswordValid(confirmPassword)
    );
  };

  const handleSignUp = () => {
    validateForm();
    if (isFormValid) {
      console.log("Form submitted");
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
      <button className={classes.SignUpButton} onClick={handleSignUp}>SignUp</button>
    </div>
  );
}

export default SignUp;
