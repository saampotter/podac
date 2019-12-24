import React, { useContext, useEffect } from "react";

import { AppContext } from "../../context";
import { Background, Bookmarks, Time } from "../../components";

import classes from "./home.module.css";

export default function Home() {
  const { fetchBookmarks } = useContext(AppContext);
  useEffect(fetchBookmarks, []);

  return (
    <div id="home">
      <Background />
      <div className={classes.ScrollContainer}>
        <Time />
        <Bookmarks />
      </div>
    </div>
  );
}
