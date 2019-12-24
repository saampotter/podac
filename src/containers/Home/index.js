import React, { useContext, useEffect } from "react";
import { Button } from "react-materialize";

import { AppContext } from "../../context";
import { Background, Time, Bookmarks } from "../../components";

import classes from "./home.module.css";

export default function Home(props) {
  const { fetchBookmarks, toggleEditMode } = useContext(AppContext);
  useEffect(fetchBookmarks, []);

  return (
    <div id="home">
      <Background />
      <div className={classes.ScrollContainer}>
        <Button
          floating
          waves="light"
          style={{
            position: "absolute",
            top: 30,
            right: 30,
            zIndex: 10,
            background: "transparent",
            boxShadow: "none"
          }}
          onClick={toggleEditMode}
        >
          <i className="material-icons">settings</i>
        </Button>
        <Time />
        <Bookmarks />
      </div>
    </div>
  );
}
