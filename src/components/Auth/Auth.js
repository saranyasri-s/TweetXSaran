import React, { useState } from "react";
import classes from "./Auth.module.css";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
function Auth() {
  const [authPage, setAuthPage] = useState("Login");
  const handleAuthPageToSignUp = () => {
    setAuthPage("SignUp");
  };
  const handleAuthPageToLogin = () => {
    setAuthPage("Login");
  };
  return (
    <div className={classes.Auth}>
      Auth
      {authPage === "Login" ? (
        <Login handleAuthPageToSignUp={handleAuthPageToSignUp}></Login>
      ) : (
        <SignUp handleAuthPageToLogin={handleAuthPageToLogin}></SignUp>
      )}
    </div>
  );
}

export default Auth;
