import React from "react";
import User from "../Users/User";
import classes from "./Following.module.css";
import FollowersUser from "./FollowersUser";

function Following({ userForOtherData }) {
  return (
    <div className={classes.Following}>
      {/* {userForOtherData.following.map((post) => (
        <User />
      ))} */}
      <FollowersUser displayName="uiyfgui" following="true"></FollowersUser>
    </div>
  );
}

export default Following;
