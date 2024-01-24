import React from "react";
import classes from "./SingleFeed.module.css";
function SingleFeed() {
  return (
    <div className={classes.SingleFeed}>
      <div className={classes.upLowdiv}>
        <div className={classes.left}>
          <img className={classes.img}></img>
          <p className={classes.name}>Arjun Reddy</p>
        </div>
        <p className={classes.time}>10 mins ago</p>
      </div>
      <div className={classes.upLowdiv}>
        <div className={classes.left}>
          <div className={classes.empty}></div>
          <p
            className={classes.post}
            style={{ marginLeft: "1rem", color: "grey", paddingLeft: "2rem" }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500st
          </p>
        </div>
        <div className={classes.halfRound}> </div>
      </div>
    </div>
  );
}

export default SingleFeed;
