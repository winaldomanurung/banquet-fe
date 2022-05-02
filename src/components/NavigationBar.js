import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { IoRestaurantOutline } from "react-icons/io5";
import styles from "./NavigationBar.module.css";
import { connect } from "react-redux";
import { authLogin } from "../actions";
import { INITIAL_STATE } from "../reducers/authReducer";

function NavigationBar(props) {
  console.log("PROPS", props.userId);
  const logoutHandler = () => {
    localStorage.removeItem("token_shutter");
    props.authLogin({
      ...INITIAL_STATE,
    });
    console.log(INITIAL_STATE);
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
            <Nav.Link eventKey="1">
              <Link
                to="/restaurants"
                style={{ textDecoration: "none", color: "#0b0b0b" }}
              >
                Restaurants
              </Link>
            </Nav.Link>
            <Nav.Link eventKey="2">
              <Link
                to="/about"
                style={{ textDecoration: "none", color: "#0b0b0b" }}
              >
                About Us
              </Link>
            </Nav.Link>
          </Nav>
          {props.userId == null ? (
            <Nav>
              <Nav.Link eventKey="3" className={styles.login}>
                <Link className={styles["login-link"]} to="/login">
                  Login
                </Link>
              </Nav.Link>
              <Nav.Link eventKey="4" className={styles.register}>
                <Link to="/register" className={styles["register-link"]}>
                  Register
                </Link>
              </Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Link to="/" onClick={logoutHandler} className={styles.login}>
                Logout
              </Link>
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
