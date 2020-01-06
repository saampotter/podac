import React from "react";
import { AppContext } from "../../../context";
import Content from "./Content";
import { Modal } from "../..";

export default class EditBookmarkModal extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.modal = React.createRef();
    let {
      bookmark: { id, title, link, color, icon }
    } = this.props;

    this.state = { id, title, link, color, icon, colorShown: false };
  }

  handleSave = () => {
    let { bookmarks, setBookmarks } = this.context;
    let { id, title, link, color, icon } = this.state;

    let _bookmarks = bookmarks.map(bookmark => {
      if (bookmark.id === id) {
        return { color, icon, id, link, title };
      }

      return bookmark;
    });

    setBookmarks(_bookmarks);

    this.modal.current.close();
  };

  handleClose = () => this.modal.current.close();

  render() {
    let { title, link, color, icon, colorShown } = this.state;
    let { close } = this.props;

    return (
      <Modal close={close} ref={this.modal}>
        <Content
          bookmark={{ title, link, color, icon }}
          colorShown={colorShown}
          title="Edit bookmark"
          handleSave={this.handleSave}
          handleClose={this.handleClose}
          update={obj => this.setState(obj)}
        />
      </Modal>
    );
  }
}
