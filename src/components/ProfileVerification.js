import React from "react";
import styles from "./ProfileVerification.module.css";
import { MdEmail, MdMarkEmailRead } from "react-icons/md";
import { connect } from "react-redux";
import axios from "axios";
import { URL_API } from "../helpers";

function ProfileVerification(props) {
  const sendEmail = (event) => {
    event.preventDefault();

    axios
      .post(URL_API + `/users/${props.userId}/verify`, {
        email: props.email,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.container}>
      {props.isVerified ? (
        <div>
          <div className={styles.logo}>
            <MdMarkEmailRead size={"4em"} color="#2175f3" />
          </div>
          <div className={styles.title}> Your account is verified. </div>
          <p className={styles.text}>
            You can access all the features in Banquet.
          </p>
        </div>
      ) : (
        <div>
          <div className={styles.logo}>
            <MdEmail size={"4em"} color="#2175f3" />
          </div>
          <div className={styles.title}> Verify your email address</div>
          <p className={styles.text}>
            Hi, {props.username}. To start using Banquet, we need to verify your
            email address at {props.email}.
          </p>
          <p className={styles.text}>Click this button to verify.</p>
          <div className={styles.center}>
            <button className={styles.verify} onClick={sendEmail}>
              CLICK TO VERIFY
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userId: state.authReducer.userId,
    username: state.authReducer.username,
    isVerified: state.authReducer.isVerified,
    email: state.authReducer.email,
  };
};

export default connect(mapStateToProps)(ProfileVerification);
