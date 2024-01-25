import React, { useEffect, useState } from "react";
import axios from "axios";

import classes from "./Users.module.css";
import User from "./User";
function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://tweetx-23df5-default-rtdb.firebaseio.com/posts"
        ); // Replace with your server URL
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchUsers();
  }, []);
  return (
    <div className={classes.Users}>
      {users.map((user) => (
        <li key={user.uid}>
          <strong>Email:</strong> {user.email}, <strong>UID:</strong> {user.uid}
        </li>
      ))}
      <User></User>
      <User></User>
      <User></User>
    </div>
  );
}

export default Users;
