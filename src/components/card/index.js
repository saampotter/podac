import React, { useEffect, useContext } from "react";
import c from "classnames";
import Tilt from "react-tilt";
import { AppContext } from "../../context";
import classes from "./card.module.css";

const DeleteButton = props => {
  const { bookmarks, setBookmarks } = useContext(AppContext);
  let button = React.useRef();

  useEffect(() => {
    // eslint-disable-next-line
    gsap.fromTo(button.current, 0.3, { opacity: 0 }, { opacity: 1 });
  }, []);

  function handleDelete(event) {
    const data = event.target.offsetParent.offsetParent.dataset.id;
    const { title } = JSON.parse(decodeURIComponent(data));

    const _bookmarks = bookmarks.filter(bookmark => bookmark.title !== title);
    setBookmarks(_bookmarks);
  }

  return (
    <button
      className={c(classes.DeleteButton, "waves-light")}
      style={{ opacity: 0 }}
      onClick={handleDelete}
      ref={button}
    >
      <i className="material-icons">delete</i>
    </button>
  );
};

const Card = React.forwardRef((props, ref) => {
  let { editMode } = useContext(AppContext);
  let { demo, bookmark, className, hideDelete, onClick } = props;
  let id = encodeURIComponent(JSON.stringify(bookmark));

  /* eslint-disable */
  return (
    <div data-id={id} className={classes.Card} ref={ref}>
      <Tilt
        className={classes.Tilt}
        options={{ max: 20, speed: 3000, scale: 1.03 }}
      >
        <a
          className={c(classes.Link, className)}
          href={editMode ? null : bookmark.link}
          style={{ backgroundColor: bookmark.color || "" }}
          onClick={onClick}
        >
          <img className={classes.Icon} src={bookmark.icon} alt="" />
          {editMode && !hideDelete ? (
            <p className={classes.Edit}>
              <i className="material-icons">edit</i>
              Edit
            </p>
          ) : null}
        </a>
      </Tilt>
      <h3 className={demo ? classes.TitleDemo : classes.Title}>
        {bookmark.title}
      </h3>
      {editMode && !hideDelete ? <DeleteButton /> : null}
    </div>
  );
});

export default Card;
