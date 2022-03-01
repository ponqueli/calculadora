import React from "react";
import $ from "jquery";
import "./Display.css";

const Display = (props) => {
  $(".Display").each(function () {
    let el = $(this);
    let textLength = el.html().length;
    if (textLength <= 11) {
      el.css("font-size", "2.1em");
    } else if (textLength > 11 && textLength <= 13) {
      el.css("font-size", "1.7em");
    } else if (textLength >= 14 && textLength <= 16) {
      el.css("font-size", "1.5em");
    } else if (textLength > 16) {
      el.css("font-size", "1.2em");
    }
  });
  return <div className="Display"> {props.value}</div>;
};

export default Display;
