import React from "react";
import styles from "./ProfileShow.module.css";
import profpicDefault from "../img/profpicDefault.png";
import { connect } from "react-redux";
import { FaRegUser, FaRegUserCircle } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { BsPatchCheck } from "react-icons/bs";
import { URL_API } from "../helpers";

function ProfileShow(props) {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
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
            <p className={styles.bio}>{props.bio}</p>
          </div>

          <div className={styles["divider2"]}>
            <div className={styles["form-title"]}>User Information</div>

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
              className={styles.input}
              value={props.fullname != "" ? props.fullname : props.username}
              readOnly
            />

            <label for="username">
              <FaRegUserCircle
                size={"1.2em"}
                color="#414141"
                className={styles.icon}
                readOnly
              />
              Username
            </label>
            <input
              type="text"
              id="username"
              className={styles.input}
              value={props.username}
              readOnly
            />
            <label for="email">
              <AiOutlineMail
                size={"1.2em"}
                color="#414141"
                className={styles.icon}
                readOnly
              />
              Email
            </label>
            <input
              type="text"
              id="email"
              className={styles.input}
              value={props.email}
              readOnly
            />

            <label for="bio">
              <BsPatchCheck
                size={"1.2em"}
                color="#414141"
                className={styles.icon}
              />
              Account Verification
            </label>
            <input
              type="text"
              id="bio"
              className={`${styles.input}`}
              value={props.isVerified != "" ? "Verified" : "Pending"}
              readOnly
            />
          </div>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userId: state.authReducer.userId,
    fullname: state.authReducer.fullname,
    username: state.authReducer.username,
    email: state.authReducer.email,
    isVerified: state.authReducer.isVerified,
    bio: state.authReducer.bio,
    imageUrl: state.authReducer.imageUrl,
  };
};

export default connect(mapStateToProps)(ProfileShow);
