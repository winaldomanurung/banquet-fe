import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL_API } from "../helpers";
import styles from "./Verification.module.css";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { MdMarkEmailRead } from "react-icons/md";
import { getSuccess, getError, getLoading } from "../actions";
import ErrorModal from "../components/ErrorModal";
import SuccessModal from "../components/SuccessModal";
import Spinner from "../components/Spinner";
import FormCheck from "react-bootstrap/FormCheck";
import AuthContext from "../store/auth-context";

function Verification(props) {
  const params = useParams();
  const [redirect, setRedirect] = useState(false);

  const [isVerified, setIsVerified] = useState(false);
  console.log(params);

  let navigate = useNavigate();

  const backToHome = () => {
    if (redirect) {
      console.log("Redirect");
      return navigate("/", { replace: true });
    }
  };

  // axios
  //   .get(URL_API + "/users/retrieve-data", {
  //     headers: {
  //       "Auth-Token": params.token,
  //     },
  //   })
  //   .then((res) => {
  //     console.log(res.data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     return navigate("/", { replace: true });
  //   });

  useEffect(() => {
    props.getLoading(true);

    axios
      .patch(
        `${URL_API}/users/verify`,
        {},
        {
          headers: {
            "Auth-Token": `${params.token}`,
          },
        }
      )
      .then((res) => {
        setIsVerified(true);
        props.getLoading(false);
        props.getSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        props.getLoading(false);
        props.getError(
          true,
          err.response.data.subject,
          err.response.data.message
        );
      });
  }, []);

  backToHome();
  return (
    <div className={styles.container}>
      {props.isLoading ? <Spinner /> : ""}
      {props.isError ? (
        <ErrorModal
          title={props.errorSubject}
          message={props.errorMessage}
          onConfirm={() => {
            props.getError(false);
            setRedirect(true);
          }}
        />
      ) : (
        ""
      )}
      {props.isSuccess && (
        <div className={styles["message-box"]}>
          <h1 className={styles.title}>Account Activated</h1>
          <hr />
          {/* {isVerified ? "Verification Success" : "Loading..."} */}
          <div className={styles.logo}>
            <MdMarkEmailRead size={"3em"} color="#2175f3" />
          </div>
          <p>
            Thank you. Your email has been verified and your account is active
            now. Please use the link below to login to your new account.
          </p>
          <Link to="/login" className={styles.login}>
            <button className={styles.button}>Login to Your Account</button>
          </Link>
          <p>Thank you for joining the Banquet community.</p>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isError: state.statusReducer.isError,
    isSuccess: state.statusReducer.isSuccess,
    isLoading: state.statusReducer.isLoading,
    errorSubject: state.statusReducer.errorSubject,
    successSubject: state.statusReducer.successSubject,
    errorMessage: state.statusReducer.errorMessage,
    successMessage: state.statusReducer.successMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getError: (status, errorSubject, errorMessage) =>
      dispatch(getError(status, errorSubject, errorMessage)),
    getSuccess: (status, successSubject, successMessage) =>
      dispatch(getSuccess(status, successSubject, successMessage)),
    getLoading: (status) => dispatch(getLoading(status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Verification);
