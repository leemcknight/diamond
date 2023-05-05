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
  Table,
} from "react-bootstrap";
import { TPlay } from "../types";
import { LineScore } from "../partials/lineScore";
import { SpinnerOverlay } from "../components/spinnerOverlay";
import { BoxScore } from "../partials/boxScore";

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
      {isLoading && <SpinnerOverlay />}
      {game && (
        <Container className="m-3">
          <Row className="bg-light border shadow-sm rounded">
            <Col className="m-4">
              <h4>
                <img
                  alt="visiting team logo"
                  src={`/team_logos/${game?.visitingTeam}.svg`}
                  width="64"
                  height="64"
                  className="mx-4"
                />
                {game.gameLog.visitorScore}
              </h4>
            </Col>
            <Col className="m-4">
              <h4>FINAL</h4>
              {new Date(game.gameDate).toLocaleDateString()}
            </Col>
            <Col className="m-4">
              <h4>
                {game.gameLog.homeScore}
                <img
                  alt="home team logo"
                  src={`/team_logos/${game?.homeTeam}.svg`}
                  width="64"
                  height="64"
                  className="mx-4"
                />
              </h4>
            </Col>
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
              <Table bordered striped size="sm" className="shadow">
                <thead>
                  <tr>
                    <th>Inning</th>
                    <th>Score</th>
                    <th>Batter</th>
                    <th>Play Description</th>
                  </tr>
                </thead>
                <tbody>
                  {innings
                    .filter((inning) => inning.inning === currentInning)
                    .map((inning) => (
                      <>
                        {inning.plays
                          .filter((play) => play.event.description != "NP")
                          .map((play) => (
                            <>
                              <tr>
                                <td align="left">{`${
                                  inning.side === "0" ? "T" : "B"
                                }${inning.inning}`}</td>
                                <td align="left">score</td>
                                <td align="left">{play.player}</td>
                                <td align="left">
                                  {`${play.event.description} `}
                                  {play.event.modifiers.map(
                                    (modifier) => ` ${modifier}.`
                                  )}
                                  {play.event.advances.map(
                                    (advance) => ` ${advance}.`
                                  )}
                                </td>
                              </tr>

                              {play.substitutions.map((substitution) => (
                                <tr>
                                  <td align="right" colSpan={4}>
                                    {substitution}
                                  </td>
                                </tr>
                              ))}

                              {play.comment && (
                                <tr>
                                  <td align="right" colSpan={4}>
                                    {play.comment}
                                  </td>
                                </tr>
                              )}
                            </>
                          ))}
                      </>
                    ))}
                </tbody>
              </Table>
            </Col>
            <Col md="auto" className="mt-3 mb-3">
              <LineScore game={game} />
              <BoxScore game={game} />
            </Col>
          </Row>
        </Container>
      )}
      ;
    </>
  );
}
