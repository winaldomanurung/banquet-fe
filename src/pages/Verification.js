import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL_API } from "../helpers";
import styles from "./Verification.module.css";
import { useParams } from "react-router-dom";

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
      {isVerified ? "Verification Success" : "Loading..."}
    </div>
  );
}

export default Verification;
