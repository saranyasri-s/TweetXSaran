import React from "react";
import classes from "./Profile.module.css";
function Profile() {
  return (
    <div className={classes.Profile}>
      <div className={classes.top}>
        <img className={classes.img}></img>
        <div className={classes.nameFollowing}>
          <p className={classes.name}>Arjun Reddy</p>
          <div className={classes.top_Bottom}>
            <p className={classes.following}>Posts : 300</p>
            <p className={classes.following}>Followers : 300</p>

            <p className={classes.following}>Following : 300</p>
          </div>
        </div>{" "}
      </div>
    </div>
  );
}

export default Profile;
