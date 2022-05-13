import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL_API } from "../helpers";
import styles from "./PasswordReset.module.css";
import { useParams } from "react-router-dom";
import { RiLockPasswordLine, RiErrorWarningFill } from "react-icons/ri";
import useInput from "../hooks/useInput";
import { FormCheck } from "react-bootstrap";
import { getSuccess, getError, getLoading } from "../actions";
import ErrorModal from "../components/ErrorModal";
import SuccessModal from "../components/SuccessModal";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { connect } from "react-redux";

function PasswordReset(props) {
  const params = useParams();
  let navigate = useNavigate();

  const [redirect, setRedirect] = useState(false);

  const backToHome = () => {
    if (redirect) {
      // console.log("Redirect");
      return navigate("/", { replace: true });
    }
  };

  axios
    .get(URL_API + "/users/retrieve-data", {
      headers: {
        "Auth-Token": params.token,
      },
    })
    .then((res) => {
      // console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      props.getError(
        true,
        err.response.data.subject,
        err.response.data.message
      );
    });

  const passwordValidation = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  const repeatPasswordValidation = (repeatPassword) =>
    repeatPassword == enteredPassword && repeatPassword.length != 0;

  const [showPassword, setShowPassword] = useState(false);
  const checkboxHandler = (event) => {
    setShowPassword(event.target.checked);
  };

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
    isTouched: isPasswordTouched,
  } = useInput(passwordValidation);

  const {
    value: enteredRepeatPassword,
    isValid: enteredRepeatPasswordIsValid,
    hasError: repeatPasswordInputHasError,
    valueChangeHandler: repeatPasswordChangeHandler,
    inputBlurHandler: repeatPasswordBlurHandler,
    reset: resetRepeatPasswordInput,
    isTouched: isRepeatPasswordTouched,
  } = useInput(repeatPasswordValidation);

  let formIsValid = false;

  if (enteredPasswordIsValid && enteredRepeatPasswordIsValid) {
    formIsValid = true;
  }

  // Handler untuk form submission
  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    props.getLoading(true);

    axios
      .patch(
        `${URL_API}/users/reset-password`,
        { password: enteredPassword, repeat_password: enteredRepeatPassword },
        {
          headers: {
            "Auth-Token": `${params.token}`,
          },
        }
      )
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

    resetPasswordInput();
    resetRepeatPasswordInput();
  };

  // Pembuatan class untuk error case
  const passwordInputClasses = passwordInputHasError ? styles.invalid : "";
  const repeatPasswordInputClasses = repeatPasswordInputHasError
    ? styles.invalid
    : "";

  // Pembuatan message untuk error case
  let errorMessage;
  let errorLogo = <RiErrorWarningFill size={"1.5em"} color="#b40e0e" />;
  if (passwordInputHasError && isPasswordTouched) {
    errorMessage =
      " Password should contains at least 8 characters, including an uppercase letter, a symbol, and a number!";
  } else if (repeatPasswordInputHasError && isRepeatPasswordTouched) {
    errorMessage = " The password confirmation doesn't match!";
  } else {
    errorMessage = "";
  }

  backToHome();

  return (
    <div className={styles.container}>
      {props.isLoading ? <Spinner /> : ""}
      {props.isError ? (
        <ErrorModal
          title={props.errorSubject}
          message={props.errorMessage}
          onConfirm={() => {
            props.getError(false);
            setRedirect(true);
          }}
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
            setRedirect(true);
          }}
        />
      ) : (
        ""
      )}
      <div className={styles["reset-form"]}>
        <h1 className={styles.title}>Reset Password</h1>
        <hr />
        <div className={styles.logo}>
          <RiLockPasswordLine size={"3em"} color="#2175f3" />
        </div>
        <p>
          Please create a new password, with at least 8 characters, including an
          uppercase letter, a symbol, and a number!
        </p>
        <form className={styles.form} onSubmit={formSubmissionHandler}>
          <p className={errorMessage ? styles.error : styles.errorHide}>
            {errorMessage == "" ? "" : errorLogo}
            {errorMessage}
          </p>
          <label for="password">Password</label>
          <input
            type={!showPassword ? "password" : "text"}
            name="password"
            id="password"
            placeholder="Your password..."
            className={`${styles.input} ${passwordInputClasses}`}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword}
          />
          <label for="repeat-password">Repeat Password</label>
          <input
            type={!showPassword ? "password" : "text"}
            name="repeat-password"
            id="repeat-password"
            placeholder="Repeat your password..."
            className={`${styles.input} ${repeatPasswordInputClasses}`}
            onChange={repeatPasswordChangeHandler}
            onBlur={repeatPasswordBlurHandler}
            value={enteredRepeatPassword}
          />
          <FormCheck
            type="checkbox"
            id="default-checkbox"
            label="Show password"
            onClick={checkboxHandler}
          />
          <button
            type="submit"
            className={formIsValid ? styles.submit : styles["submit-disabled"]}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getError: (status, errorSubject, errorMessage) =>
      dispatch(getError(status, errorSubject, errorMessage)),
    getSuccess: (status, successSubject, successMessage) =>
      dispatch(getSuccess(status, successSubject, successMessage)),
    getLoading: (status) => dispatch(getLoading(status)),
  };
};

const mapStateToProps = (state) => {
  return {
    isError: state.statusReducer.isError,
    isSuccess: state.statusReducer.isSuccess,
    isLoading: state.statusReducer.isLoading,
    errorSubject: state.statusReducer.errorSubject,
    successSubject: state.statusReducer.successSubject,
    errorMessage: state.statusReducer.errorMessage,
    successMessage: state.statusReducer.successMessage,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);
