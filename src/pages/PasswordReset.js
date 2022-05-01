import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL_API } from "../helpers";
import styles from "./PasswordReset.module.css";
import { useParams } from "react-router-dom";
import { RiLockPasswordLine, RiErrorWarningFill } from "react-icons/ri";
import useInput from "../hooks/useInput";

function PasswordReset() {
  const params = useParams();
  console.log(params);
  const passwordValidation = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  const repeatPasswordValidation = (repeatPassword) =>
    repeatPassword == enteredPassword && repeatPassword.length != 0;

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
    console.log(formIsValid);
    if (!formIsValid) {
      return;
    }

    axios
      .patch(
        `${URL_API}/users/reset-password`,
        { password: enteredPassword, repeat_password: enteredRepeatPassword },
        {
          headers: {
            Authorization: `Bearer ${params.token}`,
          },
        }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

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

  console.log(formIsValid);

  return (
    <div className={styles.container}>
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
            type="password"
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
            type="password"
            name="repeat-password"
            id="repeat-password"
            placeholder="Repeat your password..."
            className={`${styles.input} ${repeatPasswordInputClasses}`}
            onChange={repeatPasswordChangeHandler}
            onBlur={repeatPasswordBlurHandler}
            value={enteredRepeatPassword}
          />{" "}
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

export default PasswordReset;
