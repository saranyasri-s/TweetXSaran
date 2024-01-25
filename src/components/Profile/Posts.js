import React from "react";
import classes from "./Posts.module.css";
import SingleFeed from "../Feed/SingleFeed/SingleFeed";
function Posts({ userForOtherData }) {
  return (
    <div className={classes.Posts}>
      {userForOtherData.posts.map((post) => (
        <SingleFeed
          postDetail={post.postDetail.post}
          name={userForOtherData.displayName}
          time={post.postDetail.time}
        ></SingleFeed>
      ))}
    </div>
  );
}

export default Posts;
