import classes from "./App.module.css";
import Auth from "./components/Auth/Auth";
import Feed from "./components/Feed/Feed";
import { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Users from "./components/Users/Users";
function App() {
  const [isAuthenticate, setIsAuthenticate] = useState(true);
  return (
    <div className={classes.App}>
      <header className={classes.header}>
        <div className={classes.tweetX}>TweetX</div>
        {isAuthenticate && (
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
              to="/profile"
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
        <Route path="/feed" element={<Feed />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
