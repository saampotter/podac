import React, { useContext } from "react";
import c from "classnames";
import Tilt from "react-tilt";
import { AppContext } from "../../context";
import classes from "./card.module.css";

class DeleteButton extends React.Component {
  static contextType = AppContext;

  componentDidMount() {
    // eslint-disable-next-line
    gsap.fromTo(this.refs.button, 0.3, { opacity: 0 }, { opacity: 1 });
  }

  _handleDelete = event => {
    const { bookmarks, setBookmarks } = this.context;
    const data = event.target.offsetParent.offsetParent.dataset.id;
    const { title } = JSON.parse(decodeURIComponent(data));

    const _bookmarks = bookmarks.filter(bookmark => bookmark.title !== title);
    setBookmarks(_bookmarks);
  };

  render() {
    return (
      <button
        className={c(classes.DeleteButton, "waves-light")}
        style={{ opacity: 0 }}
        onClick={this._handleDelete}
        ref="button"
      >
        <i className="material-icons">delete</i>
      </button>
    );
  }
}

const Card = React.forwardRef((props, ref) => {
  let { editMode } = useContext(AppContext);
  let id = encodeURIComponent(JSON.stringify(props.bookmark));

  /* eslint-disable */
  return (
    <div data-id={id} className={classes.Card} ref={ref}>
      {editMode && !props.hideDelete ? <DeleteButton /> : null}
      <Tilt
        className={classes.Tilt}
        options={{ max: 20, speed: 3000, scale: 1.03 }}
      >
        <a
          className={c(classes.Link, props.className)}
          href={editMode ? null : props.bookmark.link}
          style={{ backgroundColor: props.bookmark.color || "" }}
          onClick={props.onClick}
        >
          <img className={classes.Icon} src={props.bookmark.icon} alt="" />
        </a>
      </Tilt>
      <h3 className={props.demo ? classes.TitleDemo : classes.Title}>
        {props.bookmark.title}
      </h3>
    </div>
  );
});

export default Card;
