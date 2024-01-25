import React, { useEffect, useState } from "react";
import axios from "axios";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust the path to your firebase.js file

import classes from "./Users.module.css";
import User from "./User";
function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userList = querySnapshot.docs.map((doc) => doc.data());
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchUsers();
  }, []);
  {console.log(users)}
  return (
    
    <div className={classes.Users}>
      {users.map((user) => (
        <User key={user} user={user}></User>
      ))}
    </div>
  );
}

export default Users;
