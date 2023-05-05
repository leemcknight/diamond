import React from "react";
import { Container, Row, Table, Col } from "react-bootstrap";
import { THittingEntry, TPitchingLine } from "../types";

type TProps = {
  teamBox: {
    lineupStats: Array<THittingEntry>;
    pitchingStats: Array<TPitchingLine>;
  };
};

export function TeamBox({ teamBox }: TProps): JSX.Element {
  return (
    <Container>
      <Row>
        <Col md="auto">
          <Table borderless size="sm">
            <thead>
              <tr>
                <th align="left">Batters</th>
                <th>PA</th>
                <th>AB</th>
                <th>R</th>
                <th>H</th>
                <th>RBI</th>
                <th>BB</th>
                <th>SO</th>
              </tr>
            </thead>
            <tbody>
              {teamBox.lineupStats.map((line) => (
                <tr>
                  <td width="100%" align="left">
                    <b>{line.name}</b> {line.positions.map((p) => p)}{" "}
                  </td>
                  <td width="100%">{line.plateAppearances}</td>
                  <td width="100%">{line.atBats}</td>
                  <td>RUNS</td>
                  <td>{line.hits}</td>
                  <td>{line.rbi}</td>
                  <td>{line.walks}</td>
                  <td>{line.strikeOuts}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
