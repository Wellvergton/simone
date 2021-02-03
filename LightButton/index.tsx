import React, { useState } from "react";
import { Position } from "../types";
import "./index.css";

enum positionClasses {
  upLeft = "top-left",
  upRight = "top-right",
  downLeft = "bottom-left",
  downRight = "bottom-right",
}

interface Props {
  disabled: Boolean;
  isLit: Boolean;
  onClick: Function;
  position: Position;
}

const LightButton: React.FC<Props> = (props) => {
  const [isLit, setIsLit] = useState(false);

  function onClick() {
    setIsLit(true);
    props.onClick();
    setTimeout(setIsLit, 400, false);
  }

  return (
    <div
      onClick={onClick}
      className={`light-button ${positionClasses[props.position]} ${
        isLit || props.isLit ? "lit" : ""
      } ${props.disabled ? "disabled" : ""}`}
    ></div>
  );
};

export default LightButton;
