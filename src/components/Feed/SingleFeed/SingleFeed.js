import React from "react";
import classes from "./SingleFeed.module.css";
function SingleFeed({ postDetail, name, time }) {
  return (
    <div className={classes.SingleFeed}>
      <div className={classes.upLowdiv}>
        <div className={classes.left}>
          <img className={classes.img}></img>
          <p className={classes.name}>{name}</p>
        </div>
        <p className={classes.time}>{time} mins ago</p>
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
