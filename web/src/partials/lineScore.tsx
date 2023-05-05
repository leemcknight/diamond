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
    <Container className="border rounded shadow-sm bg-secondary text-light">
      <Table size="sm" borderless className="text-white">
        <thead>
          <tr>
            <th key="teamSpacker" />
            {game?.gameLog.lineScore.innings.map((inning) => (
              <th key={`inning-i-${inning.inning}`}>{inning.inning}</th>
            ))}
            <th key="spacer" />
            <th>R</th>
            <th>H</th>
            <th>E</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{game?.visitingTeam}</td>
            {game?.gameLog.lineScore.innings.map((inning) => (
              <td key={`inning-v-${inning.inning}`} className="md-auto">
                {inning.visitor}
              </td>
            ))}
            <td />
            <td>{game?.gameLog.visitorScore}</td>
            <td>{game?.gameLog.visitorHits}</td>
            <td>{game?.gameLog.visitorErrors}</td>
          </tr>
          <tr>
            <td>{game?.homeTeam}</td>
            {game?.gameLog.lineScore.innings.map((inning) => (
              <td key={`inning-h-${inning.inning}`} className="md-auto">
                {inning.home}
              </td>
            ))}
            <td />
            <td>{game?.gameLog.homeScore}</td>
            <td>{game?.gameLog.homeHits}</td>
            <td>{game?.gameLog.homeErrors}</td>
          </tr>
        </tbody>
      </Table>
      <Row>
        <Col>{`W: ${lookupPlayer(game.winningPitcher)}`}</Col>
        <Col>{`L: ${lookupPlayer(game.losingPitcher)}`}</Col>
      </Row>
    </Container>
  );
}
