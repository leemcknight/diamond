import { Col, Container, Row, Table } from "react-bootstrap";
import { TBoxScore, TGame } from "../types";
import React from "react";

type TProps = {
  game: TGame;
};
export function LineScore({ game }: TProps): JSX.Element {
  function lookupPlayer(id?: string): string {
    if (!id) {
      return "";
    }
    const p = game.players.find((player) => player.id === id);
    return p ? (p.fullName ? p.fullName : id) : id;
  }
  return (
    <Container>
      <Row>
        <Col md="auto">
          <Table
            size="sm"
            borderless
            className="shadow-sm bg-secondary text-white rounded"
          >
            <thead>
              <tr>
                <th key="teamSpacer" />
                {game?.gameLog.lineScore.innings.map((inning) => (
                  <th key={`inning-i-${inning.inning}`}>{inning.inning}</th>
                ))}
                <th>R</th>
                <th>H</th>
                <th>E</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td width="100%">{game?.visitingTeam}</td>
                {game?.gameLog.lineScore.innings.map((inning) => (
                  <td
                    width="100%"
                    key={`inning-v-${inning.inning}`}
                    className="md-auto"
                  >
                    {inning.visitor}
                  </td>
                ))}
                <td>{game?.gameLog.visitorScore}</td>
                <td>{game?.gameLog.visitorHits}</td>
                <td>{game?.gameLog.visitorErrors}</td>
              </tr>
              <tr>
                <td width="100%">{game?.homeTeam}</td>
                {game?.gameLog.lineScore.innings.map((inning) => (
                  <td key={`inning-h-${inning.inning}`} className="md-auto">
                    {inning.home}
                  </td>
                ))}

                <td>{game?.gameLog.homeScore}</td>
                <td>{game?.gameLog.homeHits}</td>
                <td>{game?.gameLog.homeErrors}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>{`W: ${lookupPlayer(game.winningPitcher)}`}</Col>
        <Col>{`L: ${lookupPlayer(game.losingPitcher)}`}</Col>
      </Row>
    </Container>
  );
}
