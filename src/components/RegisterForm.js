import React from "react";
import styles from "./LoginForm.module.css";
import { Link } from "react-router-dom";
import { IoRestaurantOutline } from "react-icons/io5";

function LoginForm() {
  return (
    <div className={styles.container}>
      <div className={styles["login-form"]}>
        <div className={styles.logo}>
          <IoRestaurantOutline size={"2.5em"} color="#2175f3" />
        </div>
        <h1 className={styles.title}>Create your Banquet account</h1>
        <form className={styles.form}>
          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your email..."
            className={styles.input}
          />
          <label for="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Your username..."
            className={styles.input}
          />
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your password..."
            className={styles.input}
          />
          <label for="repeat-password">Repeat Password</label>
          <input
            type="password"
            name="repeat-password"
            id="repeat-password"
            placeholder="Repeat your password..."
            className={styles.input}
          />

          <button type="submit" className={styles.login}>
            Sign Up
          </button>
          <div>
            Have an account?{" "}
            <Link to="/login" className={styles.register}>
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
