import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Header = React.forwardRef((_, ref) => {
  const [search, setSearch] = useState();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    window.location.replace(window.location.origin);
  };
  return (
    <Navbar bg="dark" expand="lg" variant="dark" ref={ref}>
      <Container>
        <Navbar.Brand href="/">SignalR Chat</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-center">
          <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={search}
              onChange={({ target }) => setSearch(target.value)}
            />
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Button variant="outline-success" onClick={logout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default Header;
