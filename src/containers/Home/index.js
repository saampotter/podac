import React from "react";
import { AppContext } from "../../context/AppContext";
import classes from "./Home.module.css";
import Background from "../../components/Background";
import Time from "../../components/Time";
import Bookmarks from "../../components/Bookmarks";
import { Button } from "react-materialize";
import BookmarksModal from "../../elements/BookmarksModal";

export default class Home extends React.Component {
  static contextType = AppContext;

  componentDidMount() {
    this.context.fetchBookmarks();
  }

  render() {
    return (
      <div>
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
            onClick={this.context.toggleEditMode}
          >
            <i className="material-icons">settings</i>
          </Button>
          <Time />
          <Bookmarks />
          <BookmarksModal />
        </div>
      </div>
    );
  }
}
