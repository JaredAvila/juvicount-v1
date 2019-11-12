import React from "react";

import * as styles from "./Input.module.css";

const Input = props => {
  const inputClasses = [styles.InputElement];
  let inputElement = null;

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(styles.Invalid);
  }

  switch (props.inputType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          onChange={props.changed}
          value={props.value}
          {...props.config}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          onChange={props.changed}
          value={props.value}
          {...props.config}
        ></textarea>
      );
      break;
    default:
      inputElement = (
        <input onChange={props.changed} value={props.value} {...props.config} />
      );
      break;
  }

  return inputElement;
};

export default Input;
