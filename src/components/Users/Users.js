import React, { useEffect } from "react";
// firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

// redux
import { useSelector, useDispatch } from "react-redux";
import { setUsers } from "../../store/UsersSlice";
import { setUser } from "../../store/UserSlice";

// css
import classes from "./Users.module.css";

// child component
import User from "./User";

function Users() {
  const users = useSelector((state) => state.users);
  const targetUid = useSelector((state) => state.user.uid);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        console.log(querySnapshot.docs);
        const userList = querySnapshot.docs.map((doc) => {
          const userData = doc.data();
          // Add the id property to userData(ie user id to retrieve particular user from users list in firebase)
          return { id: doc.id, ...userData };
        });

        // this is to populate all the users except the logged in user
        const newUserList = userList.filter((user) => user.uid !== targetUid);

        // this is to find the logged in user
        const targetUser = userList.find((user) => user.uid === targetUid);

        // setting the state in redux(users list and the logged in user)
        dispatch(setUsers(newUserList));
        dispatch(setUser(targetUser));
      } catch (error) {
        alert(`Error fetching users:${error.message}`);
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
