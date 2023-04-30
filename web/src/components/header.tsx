import React from "react";
import { useNavigate } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

export function MainHeader(): JSX.Element {
  const navigate = useNavigate();
  return (
    <Navbar bg="primary" className="mb navbar-dark">
      <Navbar.Brand href="/">
        <img
          alt="diamond logo"
          src="/diamond.png"
          width="32"
          className="mx-3"
        />
      </Navbar.Brand>
      <Navbar.Collapse id="main-nav">
        <Nav>
          <Nav.Link onClick={() => navigate("/franchises")}>Teams</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link onClick={() => navigate("/schedules")}>Schedules</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link onClick={() => navigate("/people")}>Players</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link onClick={() => navigate("/ballparks")}>Ballparks</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link onClick={() => navigate("/about")}>About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
