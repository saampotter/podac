import React from "react";
import c from "classnames";
import classes from "./input.module.css";

export default function Input(props) {
  let { value, placeholder, onChange, type, className } = props;

  return (
    <input
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      className={c(classes.Input, className)}
    />
  );
}
