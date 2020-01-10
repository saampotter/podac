import React from "react";
import c from "classnames";
import { ChromePicker } from "react-color";
import { Input, Card, Button } from "../..";
import classes from "./modal.module.css";

const Content = props => (
  <>
    <div className={classes.Header}>
      <h5 className={classes.Title}>{props.title}</h5>
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
              onChange={e => props.update({ title: e.currentTarget.value })}
              value={props.bookmark.title}
            />
          </div>
          <div className={classes.InputContainer}>
            <p>Link</p>
            <Input
              onChange={e => props.update({ link: e.currentTarget.value })}
              placeholder={"https://www.examplelink.com"}
              value={props.bookmark.link}
            />
          </div>
          <div className={classes.InputContainer}>
            <p>Icon</p>
            <Input
              label="Icon"
              type="URL"
              onChange={e => props.update({ icon: e.currentTarget.value })}
              placeholder={"https://www.imgur.com/example_icon"}
              value={props.bookmark.icon}
            />
          </div>
        </div>

        <div style={{ visibility: props.colorShown ? "visible" : "hidden" }}>
          <ChromePicker
            width={160}
            color={props.bookmark.color}
            onChange={e => props.update({ color: e.hex })}
            className={classes.ColorPicker}
          />
        </div>
      </div>
      <div className={c("col l6 m6 s6", classes.Right)}>
        <Card
          bookmark={{
            title: props.bookmark.title,
            icon: props.bookmark.icon,
            color: props.bookmark.color
          }}
          demo={true}
          hideDelete={true}
        />
      </div>
    </div>
    <div className={classes.Footer}>
      <Button
        className={c("waves-effect", classes.Color)}
        onClick={e => props.update({ colorShown: !props.colorShown })}
      >
        <span>Select Colour</span>
      </Button>
      <div className={classes.BtnGroup}>
        <Button
          className={c("waves-effect", classes.Close)}
          onClick={props.handleClose}
        >
          Close
        </Button>
        <Button
          className={c("waves-effect", classes.Save)}
          onClick={props.handleSave}
        >
          Save
        </Button>
      </div>
    </div>
  </>
);

export default Content;
