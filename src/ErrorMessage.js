import React from "react";
import ReactDOM from "react-dom";
import "./ErrorMessage.css";

// Renders with shaking animation initially
const Snackbar = (props) => {
  return <div className={`snackbar ${(props.error ? "error-shake" : "")}`}>{props.error}</div>;
};

// ErrorMessage renders Snackbar component inside of "snackbar-root" via portal
const ErrorMessage = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Snackbar error={props.error} />,
        document.getElementById("snackbar-root")
      )}
    </>
  );
};

export default ErrorMessage;
