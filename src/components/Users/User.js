import React from "react";
// css
import classes from "./User.module.css";
// firebase
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../src/firebase"; // Adjust the path to your firebase.js file
// redux
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../store/UserSlice";

function User({ user }) {
  const users = useSelector((state) => state.users);
  const targetUid = useSelector((state) => state.user.uid);
  const userLogged = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleUpdateUser = async () => {
    try {
      if (userLogged) {
        const userDocRef = doc(db, "users", userLogged.id);

        // Update the user information
        await updateDoc(userDocRef, {
          // Update with the new following list while follow button is clicked
          following: [...userLogged.following, user.id], // Add other fields you want to update
        });

        // change the userlogged state in redux to new updated userLogged details
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
      alert(`Error updating user:${error.message}`);
      console.error("Error updating user:", error.message);
    }
  };

  return (
    <div className={classes.User}>
      <div className={classes.left}>
        <img className={classes.img}></img>
        <div className={classes.nameFollowing}>
          <p className={classes.name} style={{ textTransform: "capitalize" }}>
            {user.displayName}
          </p>
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
    </div>
  );
}

export default User;
