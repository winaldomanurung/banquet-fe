import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { IoRestaurantOutline } from "react-icons/io5";
import styles from "./NavigationBar.module.css";
import { connect } from "react-redux";

function NavigationBar(props) {
  console.log("PROPS", props.userId);
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/" className="my-auto">
          <IoRestaurantOutline size={"1.5em"} color="#2175f3" />
          <b className="ms-2 text-primary">Banquet</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link
                to="/restaurants"
                style={{ textDecoration: "none", color: "#0b0b0b" }}
              >
                Restaurants
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to="/about"
                style={{ textDecoration: "none", color: "#0b0b0b" }}
              >
                About Us
              </Link>
            </Nav.Link>
          </Nav>
          {props.userId == null && (
            <Nav>
              <Link to="/login" className={styles.login}>
                Login
              </Link>
              <Link to="/register" className={styles.register}>
                Register
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
const mapStateToProps = (state) => {
  return {
    userId: state.authReducer.userId,
    username: state.authReducer.username,
    email: state.authReducer.email,
    isVerified: state.authReducer.isVerified,
  };
};

export default connect(mapStateToProps)(NavigationBar);
