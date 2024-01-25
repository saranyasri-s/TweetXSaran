import React, { useEffect, useState } from "react";
import axios from "axios";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust the path to your firebase.js file
import { useSelector, useDispatch } from "react-redux";
import { setUsers } from "../../store/UsersSlice";
import classes from "./Users.module.css";
import User from "./User";
function Users() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userList = querySnapshot.docs.map((doc) => doc.data());
        dispatch(setUsers(userList));
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchUsers();
  }, []);
  {
    console.log(users);
  }
  return (
    <div className={classes.Users}>
      {users.map((user) => (
        <User displayName="uiyfgui" following="21"></User>
      ))}
    </div>
  );
}

export default Users;
