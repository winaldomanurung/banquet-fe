import React from "react";
import ReactDOM from "react-dom";

import styles from "./Spinner.module.css";
import { Spinner as SpinnerBS } from "react-bootstrap";

const Backdrop = () => {
  return <div className={styles.backdrop} />;
};

const SpinnerBootstrap = () => {
  return (
    <div className={styles.spinner}>
      <SpinnerBS animation="border" role="status" variant="primary">
        <span className="visually-hidden">Loading...</span>
      </SpinnerBS>
    </div>
  );
};

const Spinner = () => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <SpinnerBootstrap />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default Spinner;
