import React, { useEffect, useState } from "react";
// css
import classes from "./Profile.module.css";

// child component
import Followers from "./Followers";
import Following from "./Following";
import Posts from "./Posts";
// route
import { NavLink, Routes, Route, useParams } from "react-router-dom";

// firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust the path to your firebase.js file
import { getDatabase, ref, child, get } from "firebase/database";
import firebase from "../../../src/firebase"; // Import the Firebase configuration from firebase.js

// redux
import { setUsers } from "../../store/UsersSlice";
import { useSelector } from "react-redux";
const database = getDatabase();

function Profile() {
  const params = useParams();
  const userLogged = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userList = querySnapshot.docs.map((doc) => doc.data());
        dispatchEvent(setUsers(userList));
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className={classes.Profile}>
      <div className={classes.top}>
        <img className={classes.img}></img>
        <div className={classes.nameFollowing}>
          <p className={classes.name} style={{ textTransform: "capitalize" }}>
            {userLogged.displayName}
          </p>
          <div className={classes.top_Bottom}>
            <p className={classes.following}>
              Posts : {userLogged.posts.length}
            </p>
            <p className={classes.following}>
              Followers : {userLogged.followers.length}
            </p>

            <p className={classes.following}>
              Following : {userLogged.following.length}
            </p>
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
        {params.id === "posts" && <Posts userLogged={userLogged}></Posts>}
        {params.id === "followers" && (
          <Followers userLogged={userLogged}></Followers>
        )}
        {params.id === "following" && (
          <Following userLogged={userLogged}></Following>
        )}
      </div>
    </div>
  );
}

export default Profile;
