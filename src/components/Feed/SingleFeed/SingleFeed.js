import React, { useEffect } from "react";
import classes from "./SingleFeed.module.css";
function SingleFeed({ postDetail, name, time }) {
  function timeAgo(timestamp) {
    const currentDate = new Date();
    const postDate = new Date(timestamp);

    const seconds = Math.floor((currentDate - postDate) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return `${seconds} sec ago`;
    } else if (minutes < 60) {
      return `${minutes} min ago`;
    } else if (hours < 24) {
      return `${hours} hr ago`;
    } else {
      return `${days} day ago`;
    }
  }
  return (
    <div className={classes.SingleFeed}>
      <div className={classes.upLowdiv}>
        <div className={classes.left}>
          <img className={classes.img}></img>
          <p className={classes.name}>{name}</p>
        </div>
        <p className={classes.time}>{timeAgo(time)}</p>
      </div>
      <div className={classes.upLowdiv}>
        <div className={classes.left}>
          <div className={classes.empty}></div>
          <p
            className={classes.post}
            style={{ marginLeft: "1rem", color: "grey", paddingLeft: "2rem" }}
          >
            {postDetail}
          </p>
        </div>
        <div className={classes.halfRound}> </div>
      </div>
    </div>
  );
}

export default SingleFeed;
