import classes from "./App.module.css";
import Auth from "./components/Auth/Auth";
import Feed from "./components/Feed/Feed";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Users from "./components/Users/Users";
function App() {
  const isAuthenticated = useSelector((state) => state.user.displayName);

  return (
    <div className={classes.App}>
      <header className={classes.header}>
        <div className={classes.tweetX}>TweetX</div>
        {isAuthenticated && (
          <nav>
            <NavLink
              to="/feed"
              className={({ isActive, isPending }) =>
                isPending
                  ? classes.inactive
                  : isActive
                  ? classes.active
                  : classes.inactive
              }
            >
              Feed
            </NavLink>
            <NavLink
              to="/users"
              className={({ isActive, isPending }) =>
                isPending
                  ? classes.inactive
                  : isActive
                  ? classes.active
                  : classes.inactive
              }
            >
              Users
            </NavLink>
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
              Profile
            </NavLink>
          </nav>
        )}
      </header>

      <Routes>
        <Route path="/" element={<Auth />} />
        <Route
          path="/feed"
          element={isAuthenticated ? <Feed /> : <Navigate to="/" />}
        />
        <Route
          path="/users"
          element={isAuthenticated ? <Users /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/:id"
          element={isAuthenticated ? <Profile /> : <Navigate to="/" />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
