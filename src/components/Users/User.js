import React from "react";
import classes from "./User.module.css";
function User({ displayName,following }) {
  return (
    <div className={classes.User}>
      <div className={classes.left}>
        <img className={classes.img}></img>
        <div className={classes.nameFollowing}>
          <p className={classes.name}>{displayName}</p>
          <p className={classes.following}>
            Following:{following ? following.length : " 0 "}
          </p>
        </div>
      </div>
      {/* <p className={classes.followingStatus} style={{ fontWeight: "600", color: "grey" }}>Following</p> */}
      <button className={classes.button}>Follow</button>
    </div>
  );
}

export default User;
