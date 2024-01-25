import React from "react";
import classes from "./Followers.module.css";

import FollowersUser from "./FollowersUser";
function Followers({ userLogged }) {
  return (
    <div className={classes.Followers}>
      <div className={classes.Followers}>
        {userLogged.followers.map((follower) => (
          <FollowersUser
            displayName={userLogged.displayName}
            following="false"
          ></FollowersUser>
        ))}
      </div>
    </div>
  );
}

export default Followers;
