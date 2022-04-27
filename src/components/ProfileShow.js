import React from "react";
import styles from "./ProfileShow.module.css";
import profpic from "../img/profpic.png";
import { Table } from "react-bootstrap";

function ProfileShow() {
  return (
    <div className={styles.container}>
      {/* Divider */}
      <div className={styles.divider1}>
        <div className={styles["image-container"]}>
          <img className={styles.image} src={profpic} />
        </div>
        <div className={styles.bio}>Sharing my thoughts about food.</div>
      </div>

      {/* Divider */}
      <div className={styles["divider2"]}>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>Name</td>
              <td>John Wick</td>
            </tr>
            <tr>
              <td>Username</td>
              <td>john.wick</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>john.wick@gmail.com</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ProfileShow;
