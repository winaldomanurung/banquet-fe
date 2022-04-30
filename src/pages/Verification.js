import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL_API } from "../helpers";
import styles from "./Verification.module.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdMarkEmailRead } from "react-icons/md";

function Verification() {
  const params = useParams();
  const [isVerified, setIsVerified] = useState(false);
  console.log(params);

  useEffect(() => {
    axios
      .patch(
        `${URL_API}/users/verify`,
        {},
        {
          headers: {
            Authorization: `Bearer ${params.token}`,
          },
        }
      )
      .then((res) => {
        setIsVerified(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles["message-box"]}>
        <h1 className={styles.title}>Account Activated</h1>
        <hr />
        {/* {isVerified ? "Verification Success" : "Loading..."} */}
        <div className={styles.logo}>
          <MdMarkEmailRead size={"3em"} color="#2175f3" />
        </div>
        <p>
          Thank you, nama. Your email has been verified and your account is
          active now. Please use the link below to login to your new account.
        </p>
        <Link to="/login" className={styles.login}>
          <button className={styles.button}>Login to Your Account</button>
        </Link>
        <p>Thank you for joining the Banquet community.</p>
      </div>
    </div>
  );
}

export default Verification;
