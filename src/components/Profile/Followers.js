import React from "react";
import classes from "./Followers.module.css";
import User from "../Users/User"
function Followers() {
  return (
    <div className={classes.Followers}>
      <User></User>
      <User></User>
      <User></User>
      <User></User>
    </div>
  );
}

export default Followers;
