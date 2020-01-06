import React from "react";
import uuid from "uuid/v1";
import { AppContext } from "../../../context";
import Content from "./Content";
import { Modal } from "../..";

export default class CreateBookmarkModal extends React.Component {
  static contextType = AppContext;
  state = { title: "", link: "", color: "", icon: "", colorShown: false };
  modal = React.createRef();

  handleSave = () => {
    let { title, link, color, icon } = this.state;

    let _bookmarks = [
      ...this.context.bookmarks,
      { id: uuid(), title, link, color, icon }
    ];

    this.context.setBookmarks(_bookmarks);
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
          title="Add bookmark"
          handleSave={this.handleSave}
          handleClose={this.handleClose}
          update={obj => this.setState(obj)}
        />
      </Modal>
    );
  }
}
