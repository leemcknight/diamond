import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "react-async";
import "./playByPlay.css";
import { useGetGameQuery } from "../services/diamond";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  Spinner,
  ButtonToolbar,
  ButtonGroup,
  Button,
  Collapse,
} from "react-bootstrap";
import { TPlay } from "../types";

const inningSuffixes = {
  1: "st",
  2: "nd",
  3: "rd",
  4: "th",
  5: "th",
  6: "th",
  7: "th",
};

function inningSuffix(inning: number): string {
  const suffix = Object.keys(inningSuffixes)[inning];
  return suffix ? suffix : "rd";
}
type TPlayGrouping = {
  side: string;
  plays: Array<TPlay>;
  inning: number;
};
function groupPlays(plays: TPlay[]) {
  let innings = [];
  let currentInning = {} as TPlayGrouping;
  let play;
  for (play of plays) {
    if (
      play.inning === currentInning.inning &&
      play.side === currentInning.side
    ) {
      currentInning.plays.push(play);
    } else {
      currentInning = {
        plays: [],
        inning: play.inning,
        side: play.side,
      };
      if (play.side === "0" || play.side === "1") {
        currentInning.plays.push(play);
      }
      innings.push(currentInning);
    }
  }

  return innings;
}

export function PlayByPlay(): JSX.Element {
  const { gameId } = useParams();

  const { data: game, isLoading, isSuccess, isError, error } = useGetGameQuery(
    gameId!
  );

  const [currentInning, setCurrentInning] = React.useState(1);
  const innings = isSuccess ? groupPlays(game.plays) : [];

  return (
    <>
      {game && (
        <Container>
          <Row>
            <Col className="m-4">
              <img
                alt="visiting team logo"
                src={`/team_logos/${game?.visitingTeam}.svg`}
                width="128"
                height="128"
              />{" "}
              at{" "}
              <img
                alt="home team logo"
                src={`/team_logos/${game?.homeTeam}.svg`}
                width="128"
                height="128"
              />
            </Col>
          </Row>
          <Row>
            <Col>{new Date(game.gameDate).toLocaleDateString()}</Col>
          </Row>
          <Row>
            <Col>{game?.startTime}</Col>
          </Row>
          <Row>
            <Container className="border">
              <Row className="border-bottom md-auto">
                <Col className="md-auto">Final</Col>
                {game?.gameLog.boxScore.innings.map((inning) => (
                  <Col key={`inning-i-${inning.inning}`} className="md-auto">
                    {inning.inning}
                  </Col>
                ))}
                <Col className="md-auto">R</Col>
                <Col className="md-auto">H</Col>
                <Col className="md-auto">E</Col>
              </Row>
              <Row className="border-bottom">
                <Col className="md-auto">{game?.visitingTeam}</Col>
                {game?.gameLog.boxScore.innings.map((inning) => (
                  <Col key={`inning-v-${inning.inning}`} className="md-auto">
                    {inning.visitor}
                  </Col>
                ))}
                <Col className="md-auto">{game?.gameLog.visitorScore}</Col>
                <Col className="md-auto">{game?.gameLog.visitorHits}</Col>
                <Col className="md-auto">{game?.gameLog.visitorErrors}</Col>
              </Row>
              <Row>
                <Col className="md-auto">{game?.homeTeam}</Col>
                {game?.gameLog.boxScore.innings.map((inning) => (
                  <Col key={`inning-h-${inning.inning}`} className="md-auto">
                    {inning.home}
                  </Col>
                ))}
                <Col className="md-auto">{game?.gameLog.homeScore}</Col>
                <Col className="md-auto">{game?.gameLog.homeHits}</Col>
                <Col className="md-auto">{game?.gameLog.homeErrors}</Col>
              </Row>
            </Container>
          </Row>
          <Row>
            <Col>
              <ButtonToolbar className="justify-content-md-center m-4">
                <ButtonGroup className="mr-2">
                  {innings.map(
                    (inning) =>
                      inning.side === "0" && (
                        <Button onClick={() => setCurrentInning(inning.inning)}>
                          {inning.inning}
                        </Button>
                      )
                  )}
                </ButtonGroup>
              </ButtonToolbar>
            </Col>
          </Row>
          <Row>
            <Col>
              {innings
                .filter((inning) => inning.inning === currentInning)
                .map((inning) => (
                  <Card className="m-4 w-50">
                    <Card.Header>
                      {inning.side === "0" ? "Top" : "Bottom"} of the{" "}
                      {inning.inning} {inningSuffix(inning.inning)}
                    </Card.Header>
                    <Card.Body>
                      {inning.plays.map((play) => (
                        <div className="p-2">
                          {play.substitutions.map((substitution) => (
                            <Alert variant="secondary">{substitution}</Alert>
                          ))}
                          {play.event.shortDescription !== "NP" ? (
                            <div className="clearfix bg-white">
                              <div className="float-left">
                                <ul className="list-group">
                                  <li className="list-group-item">
                                    {`${play.player} ${play.event.description}`}
                                    {play.event.modifiers.map(
                                      (modifier) => ` ${modifier}`
                                    )}
                                  </li>
                                  {play.event.advances
                                    ? play.event.advances.map((advance) => (
                                        <li className="list-group-item list-group-item-success">
                                          {advance}
                                        </li>
                                      ))
                                    : null}
                                </ul>
                              </div>
                              <div className="float-right">
                                <button
                                  className="btn btn-primary btn-block"
                                  type="button"
                                  data-toggle="collapse"
                                  data-target={`#${play.playerId}${play.inning}${play.side}`}
                                  aria-expanded="false"
                                  aria-controls={`${play.playerId}${play.inning}${play.side}`}
                                >
                                  {play.event.shortDescription}
                                </button>

                                <div
                                  className="border border-primary"
                                  id={`${play.playerId}${play.inning}${play.side}`}
                                >
                                  {play.pitches.map((pitch) => (
                                    <div className="m-1 p-1">
                                      {pitch.result}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ) : null}
                          {play.comment && (
                            <Alert variant="primary" className="p-2">
                              {play.comment}
                            </Alert>
                          )}
                        </div>
                      ))}
                    </Card.Body>
                  </Card>
                ))}
            </Col>
          </Row>
        </Container>
      )}
      ;
    </>
  );
}
