import React from "react";
import User from "../Users/User"
import classes from "./Following.module.css";
function Following() {
  return (
    <div className={classes.Following}>
      <User></User>
      <User></User>
      <User></User>
      <User></User>
    </div>
  );
}

export default Following;
