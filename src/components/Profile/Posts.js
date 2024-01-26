import React from "react";
// css
import classes from "./Posts.module.css";
// child component
import SingleFeed from "../Feed/SingleFeed/SingleFeed";

function Posts({ userLogged }) {
  return (
    <div className={classes.Posts}>
      {userLogged.posts.map((post) => (
        <SingleFeed
          postDetail={post.postDetail.post}
          name={userLogged.displayName}
          time={post.postDetail.time}
        ></SingleFeed>
      ))}
    </div>
  );
}

export default Posts;
