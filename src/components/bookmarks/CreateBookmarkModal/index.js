import React from "react";
import c from "classnames";
import { ChromePicker } from "react-color";
import { AppContext } from "../../../context";
import { Card, Modal, Button, Input } from "../..";
import classes from "./modal.module.css";

export default class BookmarksModal extends React.Component {
  static contextType = AppContext;
  state = { title: "", link: "", color: "", icon: "", colorShown: false };
  modal = React.createRef();

  handleSave = () => {
    let { title, link, color, icon } = this.state;

    let _bookmarks = [
      ...this.context.bookmarks,
      { title: title, link: link, color: color, icon: icon }
    ];

    this.context.setBookmarks(_bookmarks);
  };

  handleClose = () => this.modal.current.close();

  render() {
    let { title, link, color, icon, colorShown } = this.state;
    let { close } = this.props;

    return (
      <Modal close={close} ref={this.modal}>
        <div className={classes.Header}>
          <h5 className={classes.Title}>Add bookmark</h5>
        </div>
        <div className={c("row", classes.Content)}>
          <div
            className={c("col l6 m6 s6", classes.Left)}
            style={{ paddingLeft: 0, paddingRight: 0 }}
          >
            <div className={classes.Center}>
              <div className={classes.InputContainer}>
                <p>Title</p>
                <Input
                  placeholder="Facebook"
                  onChange={e =>
                    this.setState({ title: e.currentTarget.value })
                  }
                  value={title}
                />
              </div>
              <div className={classes.InputContainer}>
                <p>Link</p>
                <Input
                  onChange={e => this.setState({ link: e.currentTarget.value })}
                  placeholder={"https://www.examplelink.com"}
                  value={link}
                />
              </div>
              <div className={classes.InputContainer}>
                <p>Icon</p>
                <Input
                  label="Icon"
                  type="URL"
                  onChange={e => this.setState({ icon: e.currentTarget.value })}
                  placeholder={"https://www.imgur.com/example_icon"}
                  value={icon}
                />
              </div>
            </div>

            <div style={{ opacity: colorShown ? 1 : 0 }}>
              <ChromePicker
                width={160}
                color={color}
                onChange={e => this.setState({ color: e.hex })}
                className={classes.ColorPicker}
              />
            </div>
          </div>
          <div className={c("col l6 m6 s6", classes.Right)}>
            <Card
              bookmark={{ title, icon, color }}
              demo={true}
              hideDelete={true}
            />
          </div>
        </div>
        <div className={classes.Footer}>
          <Button
            className={classes.Color}
            onClick={e => this.setState({ colorShown: !colorShown })}
          >
            <span>Select Colour</span>
          </Button>
          <div className={classes.BtnGroup}>
            <Button className={classes.Close} onClick={this.handleClose}>
              Close
            </Button>
            <Button className={classes.Save} onClick={this.handleSave}>
              Save
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}
