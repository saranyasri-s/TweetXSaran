import React from "react";
import classes from "./User.module.css";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import axios from "axios";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../src/firebase"; // Adjust the path to your firebase.js file
import { useSelector, useDispatch } from "react-redux";
import { setUsers } from "../../store/UsersSlice";
import { setUser } from "../../store/UserSlice";

function User({ user }) {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const targetUid = useSelector((state) => state.user.uid);

  const userLogged = useSelector((state) => state.user);

  const handleUpdateUser = async () => {
    try {
      if (userLogged) {
        const userDocRef = doc(db, "users", userLogged.id);

        // Update the user information
        await updateDoc(userDocRef, {
          // Update with the new display name
          following: [...userLogged.following, user.id], // Add other fields you want to update
        });
        dispatch(
          setUser({
            ...userLogged,
            following: [...userLogged.following, user.id],
          })
        );
        console.log("User updated successfully");
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  return (
    <div className={classes.User}>
      <div className={classes.left}>
        <img className={classes.img}></img>
        <div className={classes.nameFollowing}>
          <p className={classes.name}>{user.displayName}</p>
          <p className={classes.following}>
            Following:{user.following ? user.following.length : " 0 "}
          </p>
        </div>
      </div>
      {userLogged.following.includes(user.id) ? (
        <p
          className={classes.followingStatus}
          style={{ fontWeight: "600", color: "grey" }}
        >
          Following
        </p>
      ) : (
        <button onClick={handleUpdateUser} className={classes.button}>
          Follow
        </button>
      )}
      {/* <p className={classes.followingStatus} style={{ fontWeight: "600", color: "grey" }}>Following</p> */}
    </div>
  );
}

export default User;
