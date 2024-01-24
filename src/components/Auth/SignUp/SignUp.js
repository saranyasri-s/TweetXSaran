import React from "react";
import classes from "./SignUp.module.css";
function SignUp({ handleAuthPageToLogin }) {
  return (
    <div>
      SignUp
      <button
        onClick={(e) => {
          e.preventDefault();
          handleAuthPageToLogin();
        }}
      >
        Login
      </button>
    </div>
  );
}

export default SignUp;
