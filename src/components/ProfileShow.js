import React from "react";
import styles from "./ProfileShow.module.css";
import profpic from "../img/profpic.png";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { FaRegUser, FaRegUserCircle } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlineVerifiedUser } from "react-icons/md";

function ProfileShow(props) {
  console.log(props.username);
  return (
    <div className={styles.container}>
      {/* Divider */}
      <div className={styles.divider1}>
        <div className={styles["image-container"]}>
          <img className={styles.image} src={profpic} />
        </div>
        <div className={styles.bio}>{props.bio}</div>
      </div>

      {/* Divider */}
      <div className={styles["divider2"]}>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td colSpan={2} className={styles["table-title"]}>
                User Information
              </td>
            </tr>
            <tr>
              <td className={styles.thead}>
                <FaRegUser
                  size={"1.2em"}
                  color="#414141"
                  className={styles.icon}
                />
                Name
              </td>
              <td className={styles.td}>{props.fullname}</td>
            </tr>
            <tr>
              <td>
                <FaRegUserCircle
                  size={"1.2em"}
                  color="#414141"
                  className={styles.icon}
                />
                Username
              </td>
              <td>{props.username}</td>
            </tr>
            <tr>
              <td>
                <AiOutlineMail
                  size={"1.2em"}
                  color="#414141"
                  className={styles.icon}
                />
                Email
              </td>
              <td>{props.email}</td>
            </tr>
            <tr>
              <td>
                <MdOutlineVerifiedUser
                  size={"1.2em"}
                  color="#414141"
                  className={styles.icon}
                />
                Verification
              </td>
              <td>{props.isVerified ? "Account Verified" : "Pending"}</td>
            </tr>
          </tbody>
        </Table>
      </div>
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
