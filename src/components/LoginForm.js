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
        <h1 className={styles.title}>Sign in to your account</h1>
        <form className={styles.form}>
          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your email..."
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
          <Link to="/reset-password" className={styles.register}>
            Forgot your password?
          </Link>

          <button type="submit" className={styles.login}>
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

export default LoginForm;
