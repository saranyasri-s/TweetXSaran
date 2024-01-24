import React from "react";
import classes from "./User.module.css";
function User() {
  return (
    <div className={classes.User}>
      <div className={classes.left}>
        <img className={classes.img}></img>
        <div className={classes.nameFollowing}>
          <p className={classes.name}>Arjun Reddy</p>
          <p className={classes.following}>Following:300</p>
        </div>
      </div>
      {/* <p className={classes.followingStatus} style={{ fontWeight: "600", color: "grey" }}>Following</p> */}
      <button className={classes.button}>Follow</button>
    </div>
  );
}

export default User;
