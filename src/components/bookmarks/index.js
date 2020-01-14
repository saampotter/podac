import React from "react";
import c from "classnames";
import Sortable from "react-sortablejs";
import { AppContext } from "../../context";
import { Card, Button } from "..";
import Create from "./modals/Create";
import Edit from "./modals/Edit";
import classes from "./bookmarks.module.css";

class AddBookmark extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line
    gsap.fromTo(this.refs.card, 0.3, { autoAlpha: 0 }, { autoAlpha: 1 });
  }

  render() {
    return (
      <Card
        bookmark={{
          title: "Add bookmark",
          color: "#18CC64",
          icon: "/icons/add.png"
        }}
        style={{ opacity: 0 }}
        ref="card"
        hideDelete={true}
        onClick={this.props.onClick}
      />
    );
  }
}

export default class Bookmarks extends React.Component {
  static contextType = AppContext;
  state = { createModal: false, editModal: false, bookmark: {} };

  handleMove = bookmarks => {
    const { setBookmarks } = this.context;
    const _bookmarks = bookmarks
      .map(bookmark => JSON.parse(decodeURIComponent(bookmark)))
      .filter(bookmark => bookmark.title !== "Add bookmark");
    setBookmarks(_bookmarks);
  };

  render() {
    const { createModal, editModal, bookmark } = this.state;
    const { editMode, toggleEditMode, bookmarks } = this.context;

    return (
      <div id="bookmarks">
        <Sortable
          options={{ animation: 250 }}
          className={classes.Container}
          onChange={this.handleMove}
        >
          {bookmarks.map((bookmark, index) => (
            <Card
              key={index}
              bookmark={bookmark}
              onClick={
                editMode
                  ? () => {
                      this.setState({ bookmark, editModal: true });
                    }
                  : null
              }
            />
          ))}
          {editMode ? (
            <AddBookmark onClick={e => this.setState({ createModal: true })} />
          ) : null}
        </Sortable>
        <Button
          onClick={toggleEditMode}
          className={c("waves-effect waves-dark", classes.EditBtn)}
        >
          <i
            style={{ color: editMode ? "#ff3e3e" : "#1157ed" }}
            className="material-icons"
          >
            {editMode ? "close" : "edit"}
          </i>
          {editMode ? "Close" : "Edit bookmarks"}
        </Button>
        {createModal ? (
          <Create close={() => this.setState({ createModal: false })} />
        ) : null}
        {editModal ? (
          <Edit
            bookmark={bookmark}
            close={() => this.setState({ editModal: false })}
          />
        ) : null}
      </div>
    );
  }
}
