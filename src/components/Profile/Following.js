import React, { useEffect, useState } from "react";
import User from "../Users/User";
import classes from "./Following.module.css";
import FollowersUser from "./FollowersUser";
import { db } from "../../firebase"; // Adjust the path to your firebase.js file
import { doc, getDoc, updateDoc } from "firebase/firestore";
function Following({ userLogged }) {
  const [following, setFollowing] = useState([]);
  useEffect(() => {
    for (let i = 0; i < userLogged.following.length; i++) {
      const handleGetSingleUser = () => {
        const fetchUser = async (userId) => {
          try {
            const userDocRef = doc(db, "users", userId);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
              // If the document exists, set the user state
              const followingMember = { ...userDoc.data(), id: userDoc.id };
              if (!following.some((user) => user.id === followingMember.id)) {
                console.log(
                  "User not found in following, adding:",
                  followingMember
                );
                setFollowing((prevFollowing) => [
                  ...prevFollowing,
                  followingMember,
                ]);
              }
            } else {
              // Handle the case where the user doesn't exist
              console.log("User not found");
            }
          } catch (error) {
            console.error("Error fetching user:", error.message);
          }
        };
        fetchUser(userLogged.following[i]);
      };
      handleGetSingleUser();
    }
  }, [userLogged]);

  const uniqueMap = new Map();

  // Iterate over the array and store objects in the Map using a unique identifier
  following.forEach((obj) => {
    uniqueMap.set(obj.id, obj);
  });

  const uniqueArray = Array.from(uniqueMap.values());

  return (
    <div className={classes.Following}>
      {console.log(following)}
      {console.log(uniqueArray)}
      {uniqueArray.map((user) => (
        <FollowersUser
          displayName={user.displayName}
          following="true"
        ></FollowersUser>
      ))}
    </div>
  );
}

export default Following;
