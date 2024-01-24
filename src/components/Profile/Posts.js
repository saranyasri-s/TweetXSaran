import React from "react";
import classes from "./Posts.module.css";
import SingleFeed from "../Feed/SingleFeed/SingleFeed";
function Posts() {
  return (
    <div className={classes.Posts}>
      <SingleFeed></SingleFeed>
      <SingleFeed></SingleFeed>
      <SingleFeed></SingleFeed>
      <SingleFeed></SingleFeed>
    </div>
  );
}

export default Posts;
