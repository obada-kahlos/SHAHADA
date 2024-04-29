import React from "react";
import PropTypes from "prop-types";

const Button = ({ text, width, height, rounded, onClick, disabled }) => {
  return (
    <button
      style={{ width: width, height: height, borderRadius: rounded }}
      className="dark:text-black  text-white text-[16px] font-bold dark:bg-white bg-[#333]"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  rounded: PropTypes.string,
  disabled: PropTypes.bool,
  //   onClick: PropTypes.func
};

export default Button;
