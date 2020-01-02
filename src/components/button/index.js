import React from "react";
import c from "classnames";
import classes from "./button.module.css";

export default function Button(props) {
  let className = props.className
    ? c(props.className, classes.Button)
    : classes.Button;

  return (
    <button {...props} className={className}>
      {props.children}
    </button>
  );
}
