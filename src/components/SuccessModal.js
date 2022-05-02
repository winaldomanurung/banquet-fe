import React from "react";
import ReactDOM from "react-dom";

import Card from "./Card";
import styles from "./SuccessModal.module.css";
import { BsCheck } from "react-icons/bs";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {
  return (
    <Card className={styles.modal}>
      <header className={styles.header}>
        <h2>
          <BsCheck size={"2.5em"} color="#fff" /> {props.title}
        </h2>
      </header>
      <div className={styles.content}>
        <p>{props.message}</p>
      </div>
      <footer className={styles.actions}>
        <button onClick={props.onConfirm} className={styles.button}>
          OK
        </button>
      </footer>
    </Card>
  );
};

const SuccessModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default SuccessModal;
