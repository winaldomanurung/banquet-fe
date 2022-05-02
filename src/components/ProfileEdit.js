import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL_API } from "../helpers";
import styles from "./ProfileEdit.module.css";
import profpicDefault from "../img/profpicDefault.png";
import { connect } from "react-redux";
import { FaRegUser, FaRegUserCircle } from "react-icons/fa";
import { BsChatLeftQuote } from "react-icons/bs";
import { RiErrorWarningFill } from "react-icons/ri";
import useInput from "../hooks/useInput";
import { useNavigate } from "react-router-dom";
import { authLogin } from "../actions";
import { getSuccess, getError, getLoading } from "../actions";
import ErrorModal from "./ErrorModal";
import SuccessModal from "./SuccessModal";
import Spinner from "./Spinner";

function ProfileEdit(props) {
  console.log(props);
  const [redirect, setRedirect] = useState(false);

  // Untuk upload file logic
  // const [addFilename, setAddFilename] = useState("");
  const [addFile, setAddFile] = useState(null);

  const onBtnAddFile = (e) => {
    console.log(e);
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      // setAddFilename(e.target.files[0].name);
      setAddFile(e.target.files[0]);
      //untuk preview image
      let preview = document.getElementById("imgpreview");
      preview.src = URL.createObjectURL(e.target.files[0]);
    }
  };
  // CHECKPOINT
  console.log("DATA ALBUM: ", props.dataAlbum);

  const onBtnUpload = () => {
    //cek apa file sudah ada
    if (addFile) {
      // File yang kita kirim gabisa dibawa json, makanya kita pake FormData
      let formData = new FormData();

      /* 
      From Github
      Create a test FormData object
      var formData = new FormData();
      formData.append('key1', 'value1');
      formData.append('key2', 'value2');

      // Display the key/value pairs
      for (var pair of formData.entries()) {
          console.log(pair[0]+ ', ' + pair[1]);
      }
      */

      //kita masukkan file nya
      formData.append("file", addFile);
      console.log("berhasil append");
      // buat requestnya
      props.getLoading(true);
      axios
        .post(URL_API + `/users/${props.userId}/upload-img`, formData)
        .then((res) => {
          // alert(res.data.message);
          console.log(res);

          props.authLogin({ imageUrl: res.data.dataUser });
          setAddFile(null);
          props.getLoading(false);
          props.getSuccess(true, res.data.subject, res.data.message);
        })
        .catch((err) => {
          console.log("nyampe");
          props.getLoading(false);
          props.getError(
            true,
            err.response.data.subject,
            err.response.data.message
          );
          console.log("kena error");
          console.log(err);
        });
    }
  };

  // Logic upload selesai

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
  } = useInput(fullnameValidation, props.fullname ? props.fullname : "");

  const {
    value: enteredUsername,
    isValid: enteredUsernameIsValid,
    hasError: usernameInputHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsernameInput,
    isTouched: isUsernameTouched,
  } = useInput(usernameValidation, props.username);

  const {
    value: enteredBio,
    isValid: enteredBioIsValid,
    hasError: bioInputHasError,
    valueChangeHandler: bioChangeHandler,
    inputBlurHandler: bioBlurHandler,
    reset: resetBioInput,
    isTouched: isBioTouched,
  } = useInput(bioValidation, props.bio);

  console.log(enteredFullname);
  console.log(enteredUsername);
  console.log(enteredBio);

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
    console.log(props.fullname);
    console.log(props.username);
    console.log(props.bio);
    console.log(props.isSuccess);
    console.log(props.isError);

    axios
      .patch(URL_API + `/users/${props.userId}`, {
        fullname: enteredFullname || props.fullname,
        username: enteredUsername || props.username,
        bio: enteredBio || props.bio,
      })
      .then((res) => {
        console.log("res.data.dataEdit", res.data.dataEdit);

        props.authLogin(res.data.dataUser);
        props.getLoading(false);
        props.getSuccess(true, res.data.subject, res.data.message);
      })
      .catch((err) => {
        props.getLoading(false);
        props.getError(
          true,
          err.response.data.subject,
          err.response.data.message
        );
        console.log("kena error");
        console.log(err);

        console.log(err.response.data);
      });
  };

  const submitLogic = () => {
    if (
      enteredUsername == props.username &&
      enteredFullname == props.fullname &&
      enteredBio == props.bio
    ) {
      return false;
    }
    return true;
  };
  console.log(submitLogic());

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
            setRedirect(true);
          }}
        />
      ) : (
        ""
      )}
      <form className={styles.form} onSubmit={formSubmissionHandler}>
        <div className={styles["data-container"]}>
          <div className={styles.divider1}>
            <div className={styles["image-container"]}>
              <img
                id="imgpreview"
                className={styles.image}
                src={
                  props.imageUrl != null
                    ? URL_API + props.imageUrl
                    : profpicDefault
                }
              />
            </div>
            {!addFile ? (
              <div>
                <label htmlFor="img" className={styles.change}>
                  Change Image
                </label>
                <input
                  type="file"
                  id="img"
                  onChange={onBtnAddFile}
                  style={{
                    display: "none",
                  }}
                />
              </div>
            ) : (
              <div
                className={styles.change}
                onClick={onBtnUpload}
                style={{
                  background: "#2175f3",
                }}
              >
                Save Image
              </div>
            )}
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
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Your fullname..."
              className={`${styles.input} ${fullnameInputClasses}`}
              defaultValue={props.fullname}
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
              type="text"
              name="username"
              id="username"
              placeholder="Your username..."
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
              type="text"
              name="bio"
              id="bio"
              placeholder="Your bio..."
              className={`${styles.input}`}
              defaultValue={props.bio}
              onChange={bioChangeHandler}
              onBlur={bioBlurHandler}
              value={props.bio != "" ? props.bio : enteredBio}
            />
          </div>
        </div>
        {formIsValid && submitLogic() ? (
          <button type="submit" className={styles.edit}>
            Submit
          </button>
        ) : (
          <button type="submit" className={styles["edit-disabled"]} disabled>
            Submit
          </button>
        )}
      </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    authLogin: (dataLogin) => dispatch(authLogin(dataLogin)),
    getError: (status, errorSubject, errorMessage) =>
      dispatch(getError(status, errorSubject, errorMessage)),
    getSuccess: (status, successSubject, successMessage) =>
      dispatch(getSuccess(status, successSubject, successMessage)),
    getLoading: (status) => dispatch(getLoading(status)),
  };
};

const mapStateToProps = (state) => {
  return {
    userId: state.authReducer.userId,
    username: state.authReducer.username,
    fullname: state.authReducer.fullname,
    email: state.authReducer.email,
    isVerified: state.authReducer.isVerified,
    bio: state.authReducer.bio,
    imageUrl: state.authReducer.imageUrl,
    isError: state.statusReducer.isError,
    isSuccess: state.statusReducer.isSuccess,
    isLoading: state.statusReducer.isLoading,
    errorSubject: state.statusReducer.errorSubject,
    successSubject: state.statusReducer.successSubject,
    errorMessage: state.statusReducer.errorMessage,
    successMessage: state.statusReducer.successMessage,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
