import React from "react";
import Schedules from "./pages/schedules";
import People from "./people";
import { Ballparks, Franchises, PlayByPlay } from "./pages";
import Home from "./home";
import { MainHeader } from "./components/header";
import About from "./about";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

function App() {
  return (
    <Container fluid className="App">
      <Row>
        <MainHeader />
      </Row>
      <Row>
        <Col className="MainSection">
          <Routes>
            <Route exact path="/franchises" element={<Franchises />} />
            <Route exact path="/schedules" element={<Schedules />} />
            <Route exact path="/people" element={<People />} />
            <Route exact path="/games/:gameId" element={<PlayByPlay />} />
            <Route exact path="/ballparks" element={<Ballparks />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/" element={<Home />} />
          </Routes>
        </Col>
      </Row>
      <Row>
        <Footer />
      </Row>
    </Container>
  );
}

function Footer() {
  return (
    <Container>
      <Row>
        <Col>
          <p>
            {" "}
            The information used here was obtained free of charge from and is
            copyrighted by Retrosheet. Interested parties may contact Retrosheet
            at 20 Sunset Rd., Newark, DE 19711.
          </p>
          <p>
            Icons made by{" "}
            <a
              href="https://www.flaticon.com/<?=_('authors/')?>surang"
              title="surang"
            >
              surang
            </a>{" "}
            from{" "}
            <a href="https://www.flaticon.com/" title="Flaticon">
              {" "}
              www.flaticon.com
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
