import React, { useState } from "react";
import classes from "./Login.module.css";
function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setpassword] = useState("");
  const [pwdError, setPwdError] = useState("");

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
    isEmailValid(email);
    isPasswordValid(password);

    setIsFormValid(isEmailValid(email) && isPasswordValid(password));
  };

  const handleLogin = () => {
    validateForm();
    if (isFormValid) {
      console.log("Form submitted");
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
