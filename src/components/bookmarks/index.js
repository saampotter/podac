import React, { useContext } from "react";
import Sortable from "react-sortablejs";
import { AppContext } from "../../context/AppContext";
import classes from "./bookmarks.module.css";
import Card from "../card";

function AddBookmarkCard(props) {
  let { toggleModal, setModal } = useContext(AppContext);

  return (
    <Card
      bookmark={{
        title: "Add bookmark",
        color: "#18CC64",
        icon: "/icons/add.png"
      }}
      hideDelete={true}
      onClick={() => {
        setModal();
        toggleModal();
      }}
    />
  );
}

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
  let { editMode, setBookmarks } = useContext(AppContext);

  function handleMove(bookmarks) {
    let _bookmarks = bookmarks
      .map(bookmark => JSON.parse(decodeURIComponent(bookmark)))
      .filter(bookmark => bookmark.title !== "Add bookmark");
    setBookmarks(_bookmarks);
  }

  return (
    <Sortable
      options={{ animation: 250 }}
      className={classes.Container}
      onChange={handleMove}
    >
      <Cards />
      {editMode ? <AddBookmarkCard /> : null}
    </Sortable>
  );
}
