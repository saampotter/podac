import React from "react";
import c from "classnames";
import classes from "./button.module.css";

export const Button = props => (
  <button {...props} className={c(classes.Button, props.className)}>
    {props.children}
  </button>
);
