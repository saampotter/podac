import React, { useContext } from "react";
import { AppContext } from "../../context";
import classes from "./time.module.css";

export default function Time() {
  let { photo } = useContext(AppContext);
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
      <div>
        <p className={classes.Time}>{`${hour}:${minutes} ${ampm}`}</p>
        <p className={classes.Month}>{month}</p>
      </div>
      <div className={classes.PhotoDetails}>
        <span>
          <a href={photo.name_url}>By {photo.name} on Unsplash</a>
          {photo.location ? " | " : null}
          <a href={`https://www.google.com/maps?q=${photo.location}`}>
            {photo.location}
          </a>
        </span>
      </div>
    </div>
  );
}
