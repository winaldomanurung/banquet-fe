import React, { useState } from "react";
import axios from "axios";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { IoRestaurantOutline } from "react-icons/io5";
import { RiErrorWarningFill } from "react-icons/ri";
import useInput from "../hooks/useInput";
import { URL_API } from "../helpers";
import { connect } from "react-redux";
import { authLogin } from "../actions";

function Login(props) {
  // console.log("props: ", props);
  const [redirect, setRedirect] = useState(false);
  let navigate = useNavigate();
  const backToHome = () => {
    if (redirect) {
      console.log("Redirect");
      return navigate("/profile", { replace: true });
    }
  };
  const credentialValidation = (credential) =>
    credential.trim() !== "" && credential.length >= 3;
  const passwordValidation = (password) =>
    password.trim() !== "" && password.length >= 4; //ganti 8

  const {
    value: enteredCredential,
    isValid: enteredCredentialIsValid,
    hasError: credentialInputHasError,
    valueChangeHandler: credentialChangeHandler,
    inputBlurHandler: credentialBlurHandler,
    reset: resetCredentialInput,
    isTouched: isCredentialTouched,
  } = useInput(credentialValidation);

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
    isTouched: isPasswordTouched,
  } = useInput(passwordValidation);

  let formIsValid = false;

  if (enteredCredentialIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const credentialInputClasses = credentialInputHasError ? styles.invalid : "";
  const passwordInputClasses = passwordInputHasError ? styles.invalid : "";

  let errorMessage;
  let errorLogo = <RiErrorWarningFill size={"1.5em"} color="#b40e0e" />;
  if (credentialInputHasError && isCredentialTouched) {
    errorMessage = " Please provide a valid username or  email!";
  } else if (passwordInputHasError && isPasswordTouched) {
    errorMessage = " Please provide a valid password!";
  } else {
    errorMessage = "";
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    axios
      .post(URL_API + "/users/login", {
        credential: enteredCredential,
        password: enteredPassword,
      })
      .then((res) => {
        console.log("res.data.dataLogin: ", res.data.dataLogin);
        // res.data.dataLogin akan kita kirim ke dalam Redux
        localStorage.setItem("token_shutter", res.data.token);
        props.authLogin(res.data.dataLogin);
        setRedirect(true);
        resetCredentialInput();
        resetPasswordInput();
        console.log("props: ", props);
      })
      .catch((err) => {
        console.log(err);
      });
    resetCredentialInput();
    resetPasswordInput();
  };

  backToHome();

  return (
    <div className={styles.container}>
      <div className={styles["login-form"]}>
        <div className={styles.logo}>
          <IoRestaurantOutline size={"2.5em"} color="#2175f3" />
        </div>
        <h1 className={styles.title}>Sign in to your account</h1>
        <form className={styles.form} onSubmit={formSubmissionHandler}>
          <p className={errorMessage ? styles.error : styles.errorHide}>
            {errorMessage == "" ? "" : errorLogo}
            {errorMessage}
          </p>
          <label for="credential">Username/Email</label>
          <input
            type="credential"
            name="credential"
            id="credential"
            placeholder="Your username or email..."
            className={`${styles.input} ${credentialInputClasses}`}
            onChange={credentialChangeHandler}
            onBlur={credentialBlurHandler}
            value={enteredCredential}
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
          <Link to="/forget-password" className={styles.register}>
            Forgot your password?
          </Link>

          <button
            type="submit"
            className={formIsValid ? styles.login : styles["login-disabled"]}
          >
            Login
          </button>
          <div>
            Don't have an account?{" "}
            <Link to="/register" className={styles.register}>
              Sign Up
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
    isVerified: state.authReducer.isVerified,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authLogin: (dataLogin) => dispatch(authLogin(dataLogin)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
