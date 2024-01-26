// css
import classes from "./App.module.css";

// route
import { useNavigate } from "react-router-dom";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";

// child component
import Auth from "./components/Auth/Auth";
import Feed from "./components/Feed/Feed";
import Profile from "./components/Profile/Profile";
import Users from "./components/Users/Users";

// redux
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../src/store/UserSlice";
import { clearUsers } from "../src/store/UsersSlice";

function App() {
  const isAuthenticated = useSelector((state) => state.user.uid);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(clearUsers());
    navigate("/");
  };

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
            <button onClick={handleLogout} className={classes.button}>
              Logout
            </button>
          </nav>
        )}
      </header>

      {/* Rendering the component based on route url */}
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
