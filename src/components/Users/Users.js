import React, { useEffect, useState } from "react";
import axios from "axios";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust the path to your firebase.js file
import { useSelector, useDispatch } from "react-redux";
import { setUsers } from "../../store/UsersSlice";
import { setUser } from "../../store/UserSlice";
import classes from "./Users.module.css";
import User from "./User";
function Users() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const targetUid = useSelector((state) => state.user.uid);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        console.log(querySnapshot.docs);
        const userList = querySnapshot.docs.map((doc) => {
          const userData = doc.data();
          // Add the id property to userData
          return { id: doc.id, ...userData };
        });

        const newUserList = userList.filter((user) => user.uid !== targetUid);
        const targetUser = userList.find((user) => user.uid === targetUid);
        dispatch(setUsers(newUserList));
        dispatch(setUser(targetUser));
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className={classes.Users}>
      {users.map((user) => (
        <User key={user.id} user={user}></User>
      ))}
    </div>
  );
}

export default Users;
