import React from "react";
import classes from "./Users.module.css";
import User from "./User";
function Users() {
  return (
    <div className={classes.Users}>
      <User></User>
      <User></User>
      <User></User>
    </div>
  );
}

export default Users;
