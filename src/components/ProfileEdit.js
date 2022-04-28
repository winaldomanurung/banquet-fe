import React, { useState } from "react";
import axios from "axios";
import { URL_API } from "../helpers";
import styles from "./ProfileEdit.module.css";
import profpic from "../img/profpic.png";
import { connect } from "react-redux";
import { FaRegUser, FaRegUserCircle } from "react-icons/fa";
import { BsChatLeftQuote } from "react-icons/bs";
import { RiErrorWarningFill } from "react-icons/ri";
import useInput from "../hooks/useInput";
import { useNavigate } from "react-router-dom";

function ProfileEdit(props) {
  const [redirect, setRedirect] = useState(false);
  let navigate = useNavigate();
  const backToHome = () => {
    if (redirect) {
      console.log("Redirect");
      return navigate("/profile", { replace: true });
    }
  };

  const fullnameValidation = (fullname) =>
    fullname.trim() !== "" && fullname.length >= 3;

  const usernameValidation = (username) =>
    username.trim() !== "" && username.length >= 3;

  const bioValidation = (bio) => {
    return true;
  };

  const {
    value: enteredFullname,
    isValid: enteredFullnameIsValid,
    hasError: fullnameInputHasError,
    valueChangeHandler: fullnameChangeHandler,
    inputBlurHandler: fullnameBlurHandler,
    reset: resetFullnameInput,
    isTouched: isFullnameTouched,
  } = useInput(fullnameValidation);

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
    value: enteredBio,
    isValid: enteredBioIsValid,
    hasError: bioInputHasError,
    valueChangeHandler: bioChangeHandler,
    inputBlurHandler: bioBlurHandler,
    reset: resetBioInput,
    isTouched: isBioTouched,
  } = useInput(bioValidation);

  let formIsValid = false;

  if (enteredUsernameIsValid && enteredFullnameIsValid && enteredBioIsValid) {
    formIsValid = true;
  }

  const fullnameInputClasses = fullnameInputHasError ? styles.invalid : "";
  const usernameInputClasses = usernameInputHasError ? styles.invalid : "";

  let errorMessage;
  let errorLogo = <RiErrorWarningFill size={"1.5em"} color="#b40e0e" />;
  if (fullnameInputHasError && isFullnameTouched) {
    errorMessage = " Fullname should contain at least 3 characters!";
  } else if (usernameInputHasError && isUsernameTouched) {
    errorMessage = " Username should contain at least 3 characters!";
  } else {
    errorMessage = "";
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    // if (!formIsValid) {
    //   return;
    // }
    axios
      .patch(URL_API + `/users/${props.userId}`, {
        fullname: enteredFullname,
        username: enteredUsername,
        bio: enteredBio,
      })
      .then((res) => {
        console.log(res.data);
        setRedirect(true);
        resetFullnameInput();
        resetUsernameInput();
        resetBioInput();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={formSubmissionHandler}>
        <div className={styles["data-container"]}>
          <div className={styles.divider1}>
            <div className={styles["image-container"]}>
              <img className={styles.image} src={profpic} />
            </div>
            <button className={styles.change}>Change image</button>
          </div>

          <div className={styles["divider2"]}>
            <div className={styles["form-title"]}>Edit Information</div>
            <p className={errorMessage ? styles.error : styles.errorHide}>
              {errorMessage == "" ? "" : errorLogo}
              {errorMessage}
            </p>
            <label for="fullname">
              <FaRegUser
                size={"1.2em"}
                color="#414141"
                className={styles.icon}
              />
              Full Name
            </label>
            <input
              type="fullname"
              name="fullname"
              id="fullname"
              placeholder="Your fullname..."
              className={`${styles.input} ${fullnameInputClasses}`}
              defaultValue={
                props.fullname != null ? props.fullname : props.username
              }
              onChange={fullnameChangeHandler}
              onBlur={fullnameBlurHandler}
              value={enteredFullname}
            />

            <label for="username">
              <FaRegUserCircle
                size={"1.2em"}
                color="#414141"
                className={styles.icon}
              />
              Username
            </label>
            <input
              type="username"
              name="username"
              id="username"
              placeholder={props.username}
              className={`${styles.input} ${usernameInputClasses}`}
              defaultValue={props.username}
              onChange={usernameChangeHandler}
              onBlur={usernameBlurHandler}
              value={enteredUsername}
            />

            <label for="bio">
              <BsChatLeftQuote
                size={"1.2em"}
                color="#414141"
                className={styles.icon}
              />
              Bio
            </label>
            <input
              type="bio"
              name="bio"
              id="bio"
              placeholder="Your bio..."
              className={`${styles.input}`}
              defaultValue={props.bio}
              onChange={bioChangeHandler}
              onBlur={bioBlurHandler}
              value={enteredBio}
            />

            {/* <label for="credential">
              <BsChatLeftQuote
                size={"1.2em"}
                color="#414141"
                className={styles.icon}
              />
              Image
            </label>
            <input
              type="credential"
              name="credential"
              id="credential"
              placeholder="Your username..."
              className={styles.input}
              defaultValue={props.imageUrl}

              // onChange={credentialChangeHandler}
              // onBlur={credentialBlurHandler}
              // value={enteredCredential}
            /> */}
          </div>
        </div>
        <button
          type="submit"
          className={formIsValid ? styles.edit : styles["edit-disabled"]}
          // className={styles.edit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userId: state.authReducer.userId,
    username: state.authReducer.username,
    email: state.authReducer.email,
    isVerified: state.authReducer.isVerified,
    bio: state.authReducer.bio,
    imageUrl: state.authReducer.imageUrl,
  };
};

export default connect(mapStateToProps)(ProfileEdit);
