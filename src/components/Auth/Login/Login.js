import React from "react";
import classes from "./Login.module.css";
function Login({ handleAuthPageToSignUp }) {
  return (
    <div>
      Login
      <button
        onClick={(e) => {
          e.preventDefault();
          handleAuthPageToSignUp();
        }}
      >
        Sign up
      </button>
    </div>
  );
}

export default Login;
