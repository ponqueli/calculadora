import React from "react";
import "./Button.css";

const Button = (props) => {
  let classes = "Button ";
  classes += props.operation ? "operation " : "";
  classes += props.double ? "double " : "";
  classes += props.triple ? "triple " : "";
  classes += props.result ? "operationResult " : "";

  return (
    <button
      className={classes}
      onClick={(_) => props.click && props.click(props.label)}
    >
      {props.label}
    </button>
  );
};

export default Button;
