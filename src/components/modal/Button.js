import React from "react";
import { Button } from "react-materialize";

const baseStyle = {
  textTransform: "none",
  borderRadius: 5,
  boxShadow: "none"
};

export default function CustomButton(props) {
  return (
    <Button
      waves="light"
      className={props.className}
      onClick={props.onClick}
      style={{ ...baseStyle, ...props.style }}
    >
      {props.children}
    </Button>
  );
}
