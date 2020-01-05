import React, { useState, useContext } from "react";
import Sortable from "react-sortablejs";
import { AppContext } from "../../context";
import { Card, Button } from "..";
import CreateBookmarkModal from "./CreateBookmarkModal";
import classes from "./bookmarks.module.css";

function Cards(props) {
  let { editMode, bookmarks, toggleModal, setModal } = useContext(AppContext);

  if (editMode) {
    bookmarks = bookmarks.map(bookmark => ({ ...bookmark, link: "#" }));
  }

  return bookmarks.map((bookmark, index) => (
    <Card
      key={index}
      bookmark={bookmark}
      onClick={
        editMode
          ? () => {
              setModal(bookmark);
              toggleModal();
            }
          : null
      }
    />
  ));
}

export default function Bookmarks() {
  const [createModal, setCreateModal] = useState(false);
  let { editMode, toggleEditMode, setBookmarks } = useContext(AppContext);

  function handleMove(bookmarks) {
    let _bookmarks = bookmarks
      .map(bookmark => JSON.parse(decodeURIComponent(bookmark)))
      .filter(bookmark => bookmark.title !== "Add bookmark");
    setBookmarks(_bookmarks);
  }

  return (
    <div id="bookmarks">
      <Sortable
        options={{ animation: 250 }}
        className={classes.Container}
        onChange={handleMove}
      >
        <Cards />
        {editMode ? (
          <Card
            bookmark={{
              title: "Add bookmark",
              color: "#18CC64",
              icon: "/icons/add.png"
            }}
            hideDelete={true}
            onClick={e => setCreateModal(true)}
          />
        ) : null}
      </Sortable>
      <Button onClick={toggleEditMode} className={classes.EditBtn}>
        <img src="/icons/edit.svg" alt="" />
        Edit bookmarks
      </Button>
      {createModal ? <CreateBookmarkModal close={setCreateModal} /> : null}
    </div>
  );
}
