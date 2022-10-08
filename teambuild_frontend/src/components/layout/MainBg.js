import React from "react";
import classes from "./MainBg.module.css";

function MainBg(props) {
  return (
    <React.Fragment>
      <div className={classes.bg_image}></div>
      <div>{props.children}</div>
    </React.Fragment>
  );
}

export default MainBg;
