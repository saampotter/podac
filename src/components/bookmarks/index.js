import React from "react";
import Sortable from "react-sortablejs";
import { AppContext } from "../../context";
import { Card, Button } from "..";
import Create from "./modals/Create";
import Edit from "./modals/Edit";
import classes from "./bookmarks.module.css";

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
            <Card
              bookmark={{
                title: "Add bookmark",
                color: "#18CC64",
                icon: "/icons/add.png"
              }}
              hideDelete={true}
              onClick={e => this.setState({ createModal: true })}
            />
          ) : null}
        </Sortable>
        <Button onClick={toggleEditMode} className={classes.EditBtn}>
          <img src="/icons/edit.svg" alt="" />
          Edit bookmarks
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
