import React from "react";

import { AppContext } from "../../context/AppContext";

import classes from "./time.module.css";

export default class Time extends React.Component {
  static contextType = AppContext;

  componentDidUpdate() {
    let height = this.context.editMode ? "120px" : "300px";
    let opacity = this.context.editMode ? 0 : 1;
    let container = document.getElementsByClassName(classes.Container)[0];

    container.style.height = height;
    container.style.opacity = opacity;
  }

  render() {
    let date = new Date();

    let month = date.toDateString();
    month = month.slice(4, month.length - 5);

    let hour = date.getHours();
    let ampm = hour >= 12 ? "pm" : "am";
    hour -= hour > 12 ? 12 : 0;

    let minutes = date.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return (
      <div className={classes.Container}>
        <div className={classes.Date}>
          <span className={classes.Month}>{month}</span>
          <span className={classes.Divider} />
          <span className={classes.Time}>{`${hour}:${minutes} ${ampm}`}</span>
        </div>
      </div>
    );
  }
}
