import React from "react";
import { AppContext } from "../../../context";
import Content from "./Content";
import { Modal } from "../..";

export default class EditBookmarkModal extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.modal = React.createRef();
    this.state = {
      title: props.title,
      link: props.link,
      color: props.color,
      icon: props.icon,
      colorShown: false
    };
  }

  handleSave = () => {
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
