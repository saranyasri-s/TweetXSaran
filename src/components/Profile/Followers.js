import React, { useEffect, useState } from "react";
// child component
import User from "../Users/User";
// css
import classes from "./Followers.module.css";
// firebase
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function Followers({ userLogged }) {
  const [followers, setfollowers] = useState([]);
  useEffect(() => {
    for (let i = 0; i < userLogged.followers.length; i++) {
      const handleGetSingleUser = () => {
        const fetchUser = async (userId) => {
          try {
            const userDocRef = doc(db, "users", userId);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
              // If the document exists, set the user state
              const followersMember = { ...userDoc.data(), id: userDoc.id };
              if (!followers.some((user) => user.id === followersMember.id)) {
                console.log(
                  "User not found in followers, adding:",
                  followersMember
                );
                setfollowers((prevfollowers) => [
                  ...prevfollowers,
                  followersMember,
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
        fetchUser(userLogged.followers[i]);
      };
      handleGetSingleUser();
    }
  }, [userLogged]);

  const uniqueMap = new Map();

  // Iterate over the array and store objects in the Map using a unique identifier
  followers.forEach((obj) => {
    uniqueMap.set(obj.id, obj);
  });

  const uniqueArray = Array.from(uniqueMap.values());

  return (
    <div className={classes.Followers}>
      {uniqueArray.length === 0 && (
        <p
          style={{
            color: "grey",
            margin: "7rem auto",
            width: "150px",
            fontSize: "1.2rem",
          }}
        >
          No followers
        </p>
      )}
      {uniqueArray.map((user) => (
        <User key={user.id} user={user}></User>
      ))}
    </div>
  );
}

export default Followers;
