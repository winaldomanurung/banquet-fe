import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Routes, Route, useLocation } from "react-router-dom";
import ProfileShow from "../components/ProfileShow";
import ProfileEdit from "../components/ProfileEdit";
import ProfileResetPass from "../components/ProfileResetPass";
import ProfileVerification from "../components/ProfileVerification";
import styles from "./Profile.module.css";
import { FaUserAlt, FaUserEdit } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";
import { URL_API } from "../helpers";
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import { authLogin } from "../actions";
import { connect } from "react-redux";

function Profile(props) {
  const authCtx = useContext(AuthContext);

  axios
    .get(URL_API + "/users/retrieve-data", {
      headers: {
        "Auth-Token": authCtx.token,
      },
    })
    .then((res) => {
      props.authLogin(res.data.dataUser);
    })
    .catch((err) => {
      // console.log(err);
    });

  const location = useLocation();

  const [isActivePath, setIsActivePath] = useState(location.pathname);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Profile</h1>
      <div className={styles.content}>
        <nav className={styles.nav}>
          <ul className={styles["nav-items"]}>
            <li
              className={`${styles.link} ${
                isActivePath == "/profile" ? styles.isActive : ""
              }`}
            >
              <FaUserAlt
                size={"1.5em"}
                color="#f1e8e8"
                className={styles["nav-icon"]}
              />
              <Link
                to="/profile"
                className={styles["nav-item"]}
                onClick={() => setIsActivePath("/profile")}
              >
                Profile
              </Link>
            </li>
            <li
              className={`${styles.link} ${
                isActivePath == "/profile/edit" ? styles.isActive : ""
              }`}
            >
              <FaUserEdit
                size={"1.5em"}
                color="#f1e8e8"
                className={styles["nav-icon"]}
              />
              <Link
                to="/profile/edit"
                className={styles["nav-item"]}
                onClick={() => setIsActivePath("/profile/edit")}
              >
                Edit Profile
              </Link>
            </li>
            <li
              className={`${styles.link} ${
                isActivePath == "/profile/verification" ? styles.isActive : ""
              }`}
            >
              <GoVerified
                size={"1.5em"}
                color="#f1e8e8"
                className={styles["nav-icon"]}
              />
              <Link
                to="/profile/verification"
                className={styles["nav-item"]}
                onClick={() => setIsActivePath("/profile/verification")}
              >
                Verification
              </Link>
            </li>
            <li
              className={`${styles.link} ${
                isActivePath == "/profile/reset-password" ? styles.isActive : ""
              }`}
            >
              <RiLockPasswordFill
                size={"1.5em"}
                color="#f1e8e8"
                className={styles["nav-icon"]}
              />
              <Link
                to="/profile/reset-password"
                className={styles["nav-item"]}
                onClick={() => setIsActivePath("/profile/reset-password")}
              >
                Reset Password
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="" element={<ProfileShow />} />
          <Route path="/edit" element={<ProfileEdit />} />
          <Route path="/verification" element={<ProfileVerification />} />
          <Route path="/reset-password" element={<ProfileResetPass />} />
        </Routes>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userId: state.authReducer.userId,
    username: state.authReducer.username,
    fullname: state.authReducer.fullname,
    email: state.authReducer.email,
    isVerified: state.authReducer.isVerified,
    bio: state.authReducer.bio,
    imageUrl: state.authReducer.imageUrl,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authLogin: (dataLogin) => dispatch(authLogin(dataLogin)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
