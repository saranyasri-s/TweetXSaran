import React from "react";
import classes from "./Profile.module.css";
import Followers from "./Followers";
import Following from "./Following";
import { NavLink, Routes, Route, useParams } from "react-router-dom";
import Posts from "./Posts";
import { useSelector } from "react-redux";
function Profile() {
  const params = useParams();
  const userLogged = useSelector((state) => state.user);

  return (
    <div className={classes.Profile}>
      <div className={classes.top}>
        <img className={classes.img}></img>
        <div className={classes.nameFollowing}>
          <p className={classes.name}>{userLogged.displayName}</p>
          <div className={classes.top_Bottom}>
            <p className={classes.following}>Posts : 300</p>
            <p className={classes.following}>Followers : 300</p>

            <p className={classes.following}>Following : 300</p>
          </div>
        </div>
      </div>
      <div className={classes.nav}>
        <NavLink
          to="/profile/posts"
          className={({ isActive, isPending }) =>
            isPending
              ? classes.inactive
              : isActive
              ? classes.active
              : classes.inactive
          }
        >
          Posts
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? classes.inactive
              : isActive
              ? classes.active
              : classes.inactive
          }
          to="/profile/followers"
        >
          Followers
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? classes.inactive
              : isActive
              ? classes.active
              : classes.inactive
          }
          to="/profile/following"
        >
          Following
        </NavLink>
      </div>
      <div>
        {params.id === "posts" && <Posts></Posts>}
        {params.id === "followers" && <Followers></Followers>}
        {params.id === "following" && <Following></Following>}
      </div>
    </div>
  );
}

export default Profile;
