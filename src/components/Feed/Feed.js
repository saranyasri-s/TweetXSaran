import React, { useState } from "react";
import classes from "./Feed.module.css";
import SingleFeed from "./SingleFeed/SingleFeed";
function Feed() {
  const [createNewPost, setCreateNewPost] = useState(false);
  const [newPost, setNewPost] = useState("");

  const handlePostChange = (e) => {
    e.preventDefault();
    setNewPost(e.target.value);
  };
  const submitnewPost = (e) => {
    e.preventDefault();
    if (newPost.length) {
      // i will  enter code here to put request
    }
    setCreateNewPost(false);
  };
  return (
    <div className={classes.Feed}>
      <button
        onClick={() => {
          setCreateNewPost(true);
        }}
        className={classes.write}
      >
        Write
      </button>
      {createNewPost && (
        <div className={classes.newPost}>
          <textarea
            className={classes.NewPostInput}
            type="text"
            value={newPost}
            name="newPost"
            onChange={handlePostChange}
            maxLength={100}
          ></textarea>
          <button className={classes.postButton} onClick={submitnewPost}>
            Post
          </button>
        </div>
      )}{" "}
      <SingleFeed></SingleFeed>
      <SingleFeed></SingleFeed>
      <SingleFeed></SingleFeed>
    </div>
  );
}

export default Feed;
