import React from "react";
import classes from "./Followers.module.css";

import FollowersUser from "./FollowersUser";
function Followers({ userForOtherData }) {
  console.log(userForOtherData);
  return (
    <div className={classes.Followers}>
      <div className={classes.Followers}>
        {userForOtherData.followers.map((follower) => (
          <FollowersUser
            displayName={userForOtherData.displayName}
            following="false"
          ></FollowersUser>
        ))}
      </div>
    </div>
  );
}

export default Followers;
