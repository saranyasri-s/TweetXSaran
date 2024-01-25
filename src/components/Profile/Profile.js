import React, { useEffect, useState } from "react";
import classes from "./Profile.module.css";
import Followers from "./Followers";
import Following from "./Following";
import { NavLink, Routes, Route, useParams } from "react-router-dom";
import Posts from "./Posts";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust the path to your firebase.js file
import { getDatabase, ref, child, get } from "firebase/database";
import firebase from "../../../src/firebase"; // Import the Firebase configuration from firebase.js
import { setUsers } from "../../store/UsersSlice";
import { useSelector } from "react-redux";
const database = getDatabase();
function Profile() {
  const params = useParams();
  const userLogged = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  console.log(users);
  const userForOtherData = users?.filter((user) => user.uid === userLogged.uid);
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
  {
    console.log(users);
  }
  // useEffect(() => {
  //   const userRef = ref(database, `users/vwjTIogWjvyXlD24oYYV`);
  //   get(userRef)
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         const userData = snapshot.val();
  //         console.log("User Data:", userData);
  //       } else {
  //         console.log("User not found");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error retrieving user:", error.message);
  //     });
  // }, []);

  return (
    <div className={classes.Profile}>
      {console.log(userForOtherData)}
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
      {/* <div>
     {params.id === "posts" && (
          <Posts userForOtherData={userForOtherData[0]}></Posts>
        )}
        {params.id === "followers" && <Followers></Followers>}
        {params.id === "following" && <Following></Following>}
      </div> */}
    </div>
  );
}

export default Profile;
// displayName
// :
// "gowri"
// email
// :
// "gowri@gmail.com"
// followers
// :
// []
// following
// :
// []
// posts
// :
// [{…}]
// uid
// :
// "VwIKqliVyUW7za3QI8JsflRvf3z1"
