import React from "react";
import axios from "axios";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";
import { IoRestaurantOutline } from "react-icons/io5";
import { RiErrorWarningFill } from "react-icons/ri";
import { URL_API } from "../helpers";
import useInput from "../hooks/useInput";

function LoginForm() {
  // Validation schema untuk masing-masing field
  //Basic
  // const usernameValidation = (username) =>
  //   username.trim() !== "" && username.length >= 3;
  // const emailValidation = (email) => email.includes("@");
  // const passwordValidation = (password) => password.length >= 6;
  // const repeatPasswordValidation = (repeatPassword) =>
  //   repeatPassword == enteredPassword && repeatPassword.length != 0;

  // Requirement
  const usernameValidation = (username) =>
    username.trim() !== "" && username.length >= 3;
  const emailValidation = (email) =>
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  const passwordValidation = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  const repeatPasswordValidation = (repeatPassword) =>
    repeatPassword == enteredPassword && repeatPassword.length != 0;

  // Handling field dengan custom hook useInput
  const {
    value: enteredUsername,
    isValid: enteredUsernameIsValid,
    hasError: usernameInputHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsernameInput,
    isTouched: isUsernameTouched,
  } = useInput(usernameValidation);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
    isTouched: isEmailTouched,
  } = useInput(emailValidation);

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

  // Pengecekan form validity
  let formIsValid = false;

  if (
    enteredUsernameIsValid &&
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    enteredRepeatPasswordIsValid
  ) {
    formIsValid = true;
  }

  // Handler untuk form submission
  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    axios
      .post(URL_API + "/users/register", {
        username: enteredUsername,
        email: enteredEmail,
        password: enteredPassword,
        repeat_password: enteredRepeatPassword,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    resetUsernameInput();
    resetEmailInput();
    resetPasswordInput();
    resetRepeatPasswordInput();
  };

  // Pembuatan class untuk error case
  const usernameInputClasses = usernameInputHasError ? styles.invalid : "";
  const emailInputClasses = emailInputHasError ? styles.invalid : "";
  const passwordInputClasses = passwordInputHasError ? styles.invalid : "";
  const repeatPasswordInputClasses = repeatPasswordInputHasError
    ? styles.invalid
    : "";

  // Pembuatan message untuk error case
  let errorMessage;
  let errorLogo = <RiErrorWarningFill size={"1.5em"} color="#b40e0e" />;
  if (usernameInputHasError && isUsernameTouched) {
    errorMessage = " Please provide a username with atleast 3 characters!";
  } else if (emailInputHasError && isEmailTouched) {
    errorMessage = " Please provide a valid email!";
  } else if (passwordInputHasError && isPasswordTouched) {
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
      <div className={styles["login-form"]}>
        <div className={styles.logo}>
          <IoRestaurantOutline size={"2.5em"} color="#2175f3" />
        </div>
        <h1 className={styles.title}>Create your Banquet account</h1>
        <form className={styles.form} onSubmit={formSubmissionHandler}>
          <p className={errorMessage ? styles.error : styles.errorHide}>
            {errorMessage == "" ? "" : errorLogo}
            {errorMessage}
          </p>
          <label for="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Your username..."
            className={`${styles.input} ${usernameInputClasses}`}
            onChange={usernameChangeHandler}
            onBlur={usernameBlurHandler}
            value={enteredUsername}
          />
          <label for="email">Email</label>
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
          />

          <button
            type="submit"
            className={
              formIsValid ? styles.register : styles["register-disabled"]
            }
            disabled
          >
            Sign Up
          </button>
          <div>
            Have an account?{" "}
            <Link to="/login" className={styles.login}>
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
