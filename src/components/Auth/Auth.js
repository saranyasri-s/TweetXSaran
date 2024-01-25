import React, { useState } from "react";
import classes from "./Auth.module.css";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import AuthPageImage from "../../asstes/loginpageImage.png";
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
      <button
        className={classes.authbutton}
        onClick={
          authPage === "Login" ? handleAuthPageToSignUp : handleAuthPageToLogin
        }
      >
        {authPage === "Login" ? "Create Account" : "Login"}
      </button>
      <div className={classes.loginSignUp}>
        {authPage === "Login" ? <Login></Login> : <SignUp handleAuthPageToLogin={handleAuthPageToLogin}></SignUp>}
        {/* <img
          className={classes.AuthPageImage}
          alt="image"
          src={AuthPageImage}
        ></img> */}
      </div>
    </div>
  );
}

export default Auth;
