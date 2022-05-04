import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { IoRestaurantOutline } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import styles from "./NavigationBar.module.css";
import { connect } from "react-redux";
import { authLogin } from "../actions";
import { INITIAL_STATE } from "../reducers/authReducer";
import AuthContext from "../store/auth-context";

function NavigationBar(props) {
  // Check user login dengan menggunakan context
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  // console.log("PROPS", props.userId);
  const logoutHandler = () => {
    localStorage.removeItem("token_shutter");
    authCtx.logout();
    props.authLogin({
      ...INITIAL_STATE,
    });
    // console.log(INITIAL_STATE);
  };
  return (
    <Navbar collapseOnSelect bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/" className="my-auto">
          <IoRestaurantOutline size={"1.5em"} color="#2175f3" />
          <b className="ms-2 text-primary">Banquet</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn ? (
              <Nav.Link eventKey="1">
                <Link
                  to="/profile"
                  style={{ textDecoration: "none", color: "#0b0b0b" }}
                >
                  My Profile
                </Link>
              </Nav.Link>
            ) : (
              ""
            )}
            <Nav.Link eventKey="2">
              <Link
                to="/restaurants"
                style={{ textDecoration: "none", color: "#0b0b0b" }}
              >
                Restaurants
              </Link>
            </Nav.Link>
            <Nav.Link eventKey="3">
              <Link
                to="/my-restaurants"
                style={{ textDecoration: "none", color: "#0b0b0b" }}
              >
                My Restaurants
              </Link>
            </Nav.Link>
          </Nav>
          {!isLoggedIn ? (
            <Nav>
              <Nav.Link eventKey="7" className={styles.add}>
                <Link className={styles["add-link"]} to="/add-restaurant">
                  <MdAdd size={"1.5em"} color="white" /> Add Place
                </Link>
              </Nav.Link>
              <Nav.Link eventKey="4" className={styles.login}>
                <Link className={styles["login-link"]} to="/login">
                  Login
                </Link>
              </Nav.Link>
              <Nav.Link eventKey="5" className={styles.register}>
                <Link to="/register" className={styles["register-link"]}>
                  Register
                </Link>
              </Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link eventKey="6" className={styles.logout}>
                <Link
                  to="/"
                  onClick={logoutHandler}
                  className={styles["logout-link"]}
                >
                  Logout
                </Link>
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    authLogin: (dataEdit) => dispatch(authLogin(dataEdit)),
  };
};

const mapStateToProps = (state) => {
  return {
    userId: state.authReducer.userId,
    username: state.authReducer.username,
    email: state.authReducer.email,
    isVerified: state.authReducer.isVerified,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
