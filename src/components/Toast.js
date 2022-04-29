import { useState } from "react";
import { Row, Col, Button, Toast, ToastContainer } from "react-bootstrap";
import { BsCheck } from "react-icons/bs";

function ToastBootstrap({ title, message, toggleShow }) {
  return (
    <div style={{ zIndex: 1 }}>
      <ToastContainer position="middle-center">
        <Toast bg="primary" onClose={toggleShow}>
          <Toast.Header>
            <BsCheck size={"2.5em"} color="#2175f3" />
            <strong className="me-auto">{title}</strong>
          </Toast.Header>
          <Toast.Body style={{ color: "white", textAlign: "center" }}>
            {message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default ToastBootstrap;
