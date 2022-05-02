import React from "react";
import { RiLockPasswordLine, RiErrorWarningFill } from "react-icons/ri";
import styles from "./ProfileResetPass.module.css";
import useInput from "../hooks/useInput";
import axios from "axios";
import { URL_API } from "../helpers";
import { connect } from "react-redux";
import { getSuccess, getError, getLoading } from "../actions";
import ErrorModal from "../components/ErrorModal";
import SuccessModal from "../components/SuccessModal";
import Spinner from "../components/Spinner";

function ProfileResetPass(props) {
  let formIsValid = false;

  const emailValidation = (email) =>
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
    isTouched: isEmailTouched,
  } = useInput(emailValidation);

  console.log(enteredEmail, enteredEmailIsValid, emailInputHasError);

  if (enteredEmailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    props.getLoading(true);

    axios
      .post(URL_API + `/users/reset-password-request`, {
        email: enteredEmail,
      })
      .then((res) => {
        console.log(res.data);
        props.getLoading(false);
        props.getSuccess(true, res.data.subject, res.data.message);
      })
      .catch((err) => {
        console.log(err);
        props.getLoading(false);
        props.getError(
          true,
          err.response.data.subject,
          err.response.data.message
        );
      });

    resetEmailInput();
  };

  const emailInputClasses = emailInputHasError ? styles.invalid : "";

  let errorMessage;
  let errorLogo = <RiErrorWarningFill size={"1.5em"} color="#b40e0e" />;
  if (emailInputHasError && isEmailTouched) {
    errorMessage = " Please provide a valid email!";
  } else {
    errorMessage = "";
  }

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
      <div className={styles["reset-form"]}>
        <div className={styles.logo}>
          <RiLockPasswordLine size={"2.5em"} color="#2175f3" />
        </div>
        <h1 className={styles.title}>Reset your password?</h1>
        <form className={styles.form} onSubmit={formSubmissionHandler}>
          <div>
            Enter your email address and we'll send you a link to reset your
            password.
          </div>
          <p className={errorMessage ? styles.error : styles.errorHide}>
            {errorMessage == "" ? "" : errorLogo}
            {errorMessage}
          </p>

          {/* <label for="email">Email</label> */}
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your email..."
            className={`${styles.input} ${emailInputClasses}`}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
          />

          <button
            type="submit"
            className={formIsValid ? styles.reset : styles["reset-disabled"]}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userId: state.authReducer.userId,
    username: state.authReducer.username,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileResetPass);
