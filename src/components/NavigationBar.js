import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { IoRestaurantOutline } from "react-icons/io5";

function NavigationBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home" className="my-auto">
          <IoRestaurantOutline size={"1.5em"} color="#2175f3" />
          <b className="ms-2 text-primary">Banquet</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Restaurants</Nav.Link>
            <Nav.Link href="#pricing">About Us</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">
              <Button variant="primary">Login</Button>
            </Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              <Button variant="outline-primary">Register</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
