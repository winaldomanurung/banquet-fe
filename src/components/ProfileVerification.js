import React from "react";
import styles from "./ProfileVerification.module.css";
import { MdEmail, MdMarkEmailRead } from "react-icons/md";
import { connect } from "react-redux";
import axios from "axios";
import { URL_API } from "../helpers";
import { getSuccess, getError, getLoading } from "../actions";
import ErrorModal from "../components/ErrorModal";
import SuccessModal from "../components/SuccessModal";
import Spinner from "../components/Spinner";

function ProfileVerification(props) {
  const sendEmail = (event) => {
    event.preventDefault();
    props.getLoading(true);

    axios
      .post(URL_API + `/users/${props.userId}/verify`, {
        email: props.email,
      })
      .then((res) => {
        // console.log(res.data);
        props.getLoading(false);
        props.getSuccess(true, res.data.subject, res.data.message);
      })
      .catch((err) => {
        // console.log(err);
        props.getLoading(false);
        props.getError(
          true,
          err.response.data.subject,
          err.response.data.message
        );
      });
  };

  return (
    <div className={styles.container}>
      {props.isLoading ? <Spinner /> : ""}
      {props.isError ? (
        <ErrorModal
          title={props.errorSubject}
          message={props.errorMessage}
          onConfirm={() => props.getError(false)}
        />
      ) : (
        ""
      )}
      {props.isSuccess ? (
        <SuccessModal
          title={props.successSubject}
          message={props.successMessage}
          onConfirm={() => {
            props.getSuccess(false);
          }}
        />
      ) : (
        ""
      )}
      {props.isVerified ? (
        <div>
          <div className={styles.logo}>
            <MdMarkEmailRead size={"4em"} color="#2175f3" />
          </div>
          <div className={styles.title}> Your account is verified. </div>
          <p className={styles.text}>
            You can access all the features in Banquet.
          </p>
        </div>
      ) : (
        <div>
          <div className={styles.logo}>
            <MdEmail size={"4em"} color="#2175f3" />
          </div>
          <div className={styles.title}> Verify your email address</div>
          <p className={styles.text}>
            Hi, {props.username}. To start using Banquet, we need to verify your
            email address at {props.email}.
          </p>
          <p className={styles.text}>Click this button to verify.</p>
          <div className={styles.center}>
            <button className={styles.verify} onClick={sendEmail}>
              CLICK TO VERIFY
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userId: state.authReducer.userId,
    username: state.authReducer.username,
    isVerified: state.authReducer.isVerified,
    email: state.authReducer.email,
    isError: state.statusReducer.isError,
    isSuccess: state.statusReducer.isSuccess,
    isLoading: state.statusReducer.isLoading,
    errorSubject: state.statusReducer.errorSubject,
    successSubject: state.statusReducer.successSubject,
    errorMessage: state.statusReducer.errorMessage,
    successMessage: state.statusReducer.successMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getError: (status, errorSubject, errorMessage) =>
      dispatch(getError(status, errorSubject, errorMessage)),
    getSuccess: (status, successSubject, successMessage) =>
      dispatch(getSuccess(status, successSubject, successMessage)),
    getLoading: (status) => dispatch(getLoading(status)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileVerification);
