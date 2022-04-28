import React, { useState } from "react";
import styles from "./ProfileEdit.module.css";
import profpic from "../img/profpic.png";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { FaRegUser, FaRegUserCircle } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { BsChatLeftQuote } from "react-icons/bs";

function ProfileEdit(props) {
  const [nameInput, setNameInput] = useState("");

  const fullnameChangeHandler = (event) => {
    setNameInput(event.target.value);
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={null}>
        <div className={styles["data-container"]}>
          <div className={styles.divider1}>
            <div className={styles["image-container"]}>
              <img className={styles.image} src={profpic} />
            </div>
            <button className={styles.change}>Change image</button>
          </div>

          <div className={styles["divider2"]}>
            <div className={styles["form-title"]}>Edit Information</div>
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
              placeholder={props.username}
              className={styles.input}
              defaultValue={props.username}
              onChange={fullnameChangeHandler}
              // onBlur={fullnameBlurHandler}
              // value={enteredFullname}
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
              className={styles.input}
              defaultValue={props.username}

              // onChange={usernameChangeHandler}
              // onBlur={usernameBlurHandler}
              // value={enteredUsername}
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
              placeholder={props.email}
              className={styles.input}
              defaultValue={props.email}

              // onChange={bioChangeHandler}
              // onBlur={bioBlurHandler}
              // value={enteredBio}
            />

            <label for="credential">
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
              placeholder="Your username or email..."
              className={styles.input}

              // onChange={credentialChangeHandler}
              // onBlur={credentialBlurHandler}
              // value={enteredCredential}
            />
          </div>
        </div>
        <button
          type="submit"
          // className={formIsValid ? styles.login : styles["login-disabled"]}
          className={styles.edit}
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
  };
};

export default connect(mapStateToProps)(ProfileEdit);
