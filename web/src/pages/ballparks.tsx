import React, { useState } from "react";
import { Container, Row, Col, Card, Alert, Spinner } from "react-bootstrap";
import { useGetBallparksQuery } from "../services/diamond";
import { safeDateString } from "../util/date";

export function Ballparks(): JSX.Element {
  const { data: ballparks, error, isError, isSuccess } = useGetBallparksQuery();

  return (
    <Container>
      {error && (
        <Row>
          <Col>
            <Alert variant="warning">Error loading ballparks.</Alert>
          </Col>
        </Row>
      )}
      {ballparks ? (
        ballparks.map((ballpark) => (
          <Card className="m-5">
            <Card.Header>{ballpark.name}</Card.Header>
            <Card.Body>
              <Card.Title>
                {safeDateString(ballpark.startDate)} -{" "}
                {safeDateString(ballpark.endDate)}
              </Card.Title>
              <Card.Text>
                {ballpark.city}, {ballpark.state}
              </Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <Row>
          <Col>
            <Spinner animation="border" />
          </Col>
        </Row>
      )}
    </Container>
  );
}
