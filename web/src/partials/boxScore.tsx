import React from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { TGame } from "../types";
import { gameDuration } from "../util/time";

type TProps = {
  game: TGame;
};

export function BoxScore({ game }: TProps): JSX.Element {
  return (
    <Container className="bg-secondary text-white rounded shadow">
      <Tabs>
        <Tab eventKey="visitor" title={game.visitingTeam}></Tab>
        <Tab eventKey="home" title={game.homeTeam}></Tab>
      </Tabs>
      <Row>
        <Col>
          <span>
            <b>Umpires:</b>
          </span>
        </Col>
      </Row>
      <Row>
        <span>
          <b>Weather:</b> {`${game.temp} degrees, ${game.sky}`}
        </span>
      </Row>
      <Row>
        <span>
          <b>First pitch:</b> {game.startTime}
        </span>
      </Row>
      <Row>
        <span>
          <b>T: </b>
          {gameDuration(game.timeOfGame)}
        </span>
      </Row>
      <Row>
        <span>
          <b>Att:</b> {game.attendance?.toLocaleString()}
        </span>
      </Row>
      <Row>
        <span>
          <b>Venue:</b>
          {game.ballpark}
        </span>
      </Row>
      <Row>
        <b>{new Date(game.gameDate).toLocaleDateString()}</b>
      </Row>
    </Container>
  );
}
