import React from "react";
import { TextInput } from "react-materialize";
import { ChromePicker } from "react-color";
import { AppContext } from "../../context/AppContext";
import Card from "../Card";
import Button from "./Button";
import classes from "./Bookmarks.module.css";

export default class BookmarksModal extends React.Component {
  static contextType = AppContext;
  state = { colorShown: false };

  handleSave = () => {
    // let { title, link, color, icon } = this.state;

    console.log(this.context.modalDetails);

    // let _bookmarks = [
    //   ...this.context.bookmarks,
    //   { title: title, link: link, color: color, icon: icon }
    // ];

    // this.context.setBookmarks(_bookmarks);
  };

  render() {
    let { setModal, modalDetails } = this.context;
    let { colorShown } = this.state;

    return (
      <div className={classes.Container}>
        <div className={classes.Overlay} />
        <div className={classes.Modal}>
          <div className={classes.Header}>
            <span className={classes.Divider}></span>
            <h5 className={classes.Title}>
              <b>Add bookmark</b>
            </h5>
          </div>
          <div className="row" style={{ display: "flex", flexWrap: "wrap" }}>
            <div
              className="col l6 m6 s6"
              style={{ paddingLeft: 0, paddingRight: 20 }}
            >
              <div style={{ margin: "30px 0 40px 0" }}>
                <TextInput
                  noLayout
                  placeholder="Title"
                  onChange={e =>
                    setModal({ ...modalDetails, title: e.currentTarget.value })
                  }
                  value={modalDetails.title}
                />
              </div>
              <div style={{ margin: "40px 0" }}>
                <TextInput
                  label="Link"
                  noLayout
                  onChange={e =>
                    setModal({ ...modalDetails, link: e.currentTarget.value })
                  }
                  placeholder={"https://www.examplelink.com"}
                  value={modalDetails.link}
                />
              </div>
              <div style={{ margin: "40px 0 20px 0" }}>
                <TextInput
                  label="Icon"
                  type="URL"
                  noLayout
                  onChange={e =>
                    setModal({ ...modalDetails, icon: e.currentTarget.value })
                  }
                  placeholder={"https://www.imgur.com/example_icon"}
                  value={modalDetails.icon}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 220,
                  opacity: colorShown ? 1 : 0
                }}
              >
                <ChromePicker
                  width={180}
                  color={modalDetails.color}
                  onChange={e => setModal({ ...modalDetails, color: e.hex })}
                />
              </div>
            </div>
            <div
              className="col l6 m6 s6"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 100,
                paddingRight: 50
              }}
            >
              <Card
                bookmark={{
                  title: modalDetails.title,
                  icon: modalDetails.icon,
                  color: modalDetails.color
                }}
                demo={true}
                hideDelete={true}
              />
            </div>
          </div>
          <div className={classes.Footer}>
            <Button
              style={{ backgroundColor: "#4b84fc" }}
              className={classes.colourButton}
              onClick={e => this.setState({ colorShown: !colorShown })}
            >
              <span>Select Colour</span>
            </Button>
            <div>
              <Button
                style={{
                  backgroundColor: "#F5F5F5",
                  width: 90,
                  color: "#FF3E3E"
                }}
                onClick={this.context.toggleModal}
              >
                Close
              </Button>
              <Button
                style={{
                  backgroundColor: "#22BF52",
                  marginLeft: 20,
                  width: 90
                }}
                onClick={this.handleSave}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
