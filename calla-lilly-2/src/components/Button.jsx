import React from "react";
import "./Button.css";

const Button = ({ name, onClick, type = "button", disabled = false }) => {
  return (
    <button
      type={type}
      className="custom-button"
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </button>
  );
};

export default Button;
