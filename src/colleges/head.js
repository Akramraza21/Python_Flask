import React from "react";
import classes from "./colleges.module.css";

export default function head(props) {
  return (
    <div className={classes.above}>
      {props.promoted ? (
        <div className={classes.pointer}>
          <div className={classes.promoted}> PROMOTED</div>
        </div>
      ) : null}
      <div className={classes.rankLocation}>
        {props.tags.map((item, ind) => (
          <div key={ind} className={classes.ranking}>
            {item}
          </div>
        ))}
      </div>
      <div className={classes.rank}>#{props.ranking}</div>
      <div className={classes.rating}>
        <div>
          {props.rating}/<small>5</small>
        </div>
        <div>
          <small>{props.rating_remarks}</small>
        </div>
      </div>
    </div>
  );
}
