import React from "react";
import { RiLockPasswordLine, RiErrorWarningFill } from "react-icons/ri";
import styles from "./ProfileResetPass.module.css";
import useInput from "../hooks/useInput";
import axios from "axios";
import { Link } from "react-router-dom";
import { URL_API } from "../helpers";
import { connect } from "react-redux";

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
    axios
      .post(URL_API + `/users/reset-password/${props.userId}`, {
        email: enteredEmail,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

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
      <div className={styles["reset-form"]}>
        <div className={styles.logo}>
          <RiLockPasswordLine size={"2.5em"} color="#2175f3" />
        </div>
        <h1 className={styles.title}>Forgot your password?</h1>
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
          <div>
            Don't have an account?{" "}
            <Link to="/register" className={styles.register}>
              Create an Account
            </Link>
          </div>
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
  };
};

export default connect(mapStateToProps)(ProfileResetPass);
