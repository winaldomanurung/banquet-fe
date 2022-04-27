import React from "react";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import ProfileShow from "../components/ProfileShow";
import ProfileEdit from "../components/ProfileEdit";
import ProfileResetPass from "../components/ProfileResetPass";
import ProfileVerification from "../components/ProfileVerification";
import styles from "./Profile.module.css";

function Profile() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <ul className={styles["nav-items"]}>
          <Link to="/profile" className={styles["nav-item"]}>
            Profile
          </Link>
          <Link to="/profile/edit" className={styles["nav-item"]}>
            Edit Profile
          </Link>
          <Link to="/profile/verification" className={styles["nav-item"]}>
            Verification
          </Link>
          <Link to="/profile/reset-password" className={styles["nav-item"]}>
            Reset Password
          </Link>
        </ul>
      </nav>

      <Routes>
        <Route path="" element={<ProfileShow />} />
        <Route path="edit" element={<ProfileEdit />} />
        <Route path="verification" element={<ProfileVerification />} />
        <Route path="reset-password" element={<ProfileResetPass />} />
      </Routes>
    </div>
  );
}

export default Profile;
