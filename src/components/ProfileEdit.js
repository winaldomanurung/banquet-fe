import React, { useState, useEffect } from "react";
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
import { authLogin } from "../actions";
import { getAlbum } from "../actions";
import ToastBootstrap from "./Toast";

function ProfileEdit(props) {
  console.log(props);
  const [redirect, setRedirect] = useState(false);
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  // Untuk upload file logic
  const [addFilename, setAddFilename] = useState("");
  const [addFile, setAddFile] = useState(null);

  const onBtnAddFile = (e) => {
    console.log(e);
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      setAddFilename(e.target.files[0].name);
      setAddFile(e.target.files[0]);
      //untuk preview image
      let preview = document.getElementById("imgpreview");
      preview.src = URL.createObjectURL(e.target.files[0]);
    }
  };
  // CHECKPOINT
  console.log("DATA ALBUM: ", props.dataAlbum);

  const getDataAlbum = () => {
    axios
      .get(URL_API + "/upload/get")
      .then((res) => {
        console.log("res.data", res.data.data);
        props.getAlbum(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        console.log("gagal fetch");
      });
  };

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

      // buat requestnya
      axios
        .post(URL_API + "/upload", formData)
        .then((res) => {
          getDataAlbum();
          alert(res.data.message);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  console.log("DATA ALBUM", props.dataAlbum);
  const printCard = () => {
    let dataAlbum = props.dataAlbum;
    console.log("dataAlbum", dataAlbum);
    return dataAlbum.map((item, index) => {
      return <img src={item.image}></img>;
    });
  };

  useEffect(() => {
    getDataAlbum();
  }, []);

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
  } = useInput(fullnameValidation, props.fullname);

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
    axios
      .patch(URL_API + `/users/${props.userId}`, {
        fullname: enteredFullname,
        username: enteredUsername,
        bio: enteredBio,
      })
      .then((res) => {
        console.log("res.data.dataEdit", res.data.dataEdit);
        setRedirect(true);
        props.authLogin(res.data.dataEdit);
        setShow(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={formSubmissionHandler}>
        {show ? (
          <ToastBootstrap
            title="Edit Profile"
            message="Edit data is saved!"
            show={show}
            toggleShow={toggleShow}
          />
        ) : null}

        <div className={styles["data-container"]}>
          <div className={styles.divider1}>
            <div className={styles["image-container"]}>
              <img className={styles.image} src={profpic} />
            </div>
            <button className={styles.change}>Change image</button>

            {/* IMAGE UPLOAD */}
            {/* Kita simpan file gambar yang akan diupload ke dalam state. Dari state, nantinya gambar di previe, baru diupload ketika button ADD dijalankan. */}
            <div>
              <label htmlFor="img">Image</label>
              <input type="file" id="img" onChange={onBtnAddFile} />
            </div>
            <div className="col-md-3">
              <img id="imgpreview" width="100%" />
            </div>
            {/* CHECKPOINT */}

            <div className={styles.change} onClick={onBtnUpload}>
              Change image
            </div>

            <div className="row container m-auto">{printCard()}</div>
            {/* IMAGE UPLOAD */}
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
              defaultValue="dsa"
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

const mapDispatchToProps = (dispatch) => {
  return {
    authLogin: (dataEdit) => dispatch(authLogin(dataEdit)),
    getAlbum: (data) => dispatch(getAlbum(data)),
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
    dataAlbum: state.albumReducer.dataAlbum,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
