import React, { useEffect, useState } from "react";
import ScheduleForm from "../components/scheduleForm";
import {
  useGetFranchisesQuery,
  useGetScheduleQuery,
} from "../services/diamond";
import { TFranchise, TMonthSchedule, TTeamSchedule } from "../types";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
const {
  Container,
  Row,
  Col,
  Card,
  CardDeck,
  Alert,
} = require("react-bootstrap");
const moment = require("moment");

function Schedules(): JSX.Element {
  const [scheduleFilter, setScheduleFilter] = useState({
    year: "2017",
    month: "08",
    team: "CHN",
  } as TTeamSchedule);

  const {
    data: schedule,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetScheduleQuery(scheduleFilter);

  const {
    data: franchises,
    isLoading: teamsLoading,
    isError: isTeamsError,
    error: teamsError,
  } = useGetFranchisesQuery();

  function teamName(id: string): string {
    if (franchises) {
      const [team] = franchises.filter(
        (franchise) => franchise.originalFranchiseId === id
      );
      return `${team.location} ${team.nickname}`;
    } else {
      return "Unknows";
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <ScheduleForm
            scheduleCallback={(schedule) => setScheduleFilter(schedule)}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <td>Date</td>
                <td>Home</td>
                <td>Visiting</td>
                <td>Action</td>
              </tr>
            </thead>
            {schedule &&
              franchises &&
              schedule
                .filter(
                  (game) =>
                    game.homeTeam === scheduleFilter.team ||
                    game.visitingTeam === scheduleFilter.team
                )
                .map((game) => (
                  <tr>
                    <td>
                      {moment(game.date, "YYYYMMDD").format("MM/DD/YYYY")}
                    </td>
                    <td>
                      <img
                        alt="home logo"
                        src={`/team_logos/${game.homeTeam}.svg`}
                        width="48"
                        height="48"
                      />
                      {teamName(game.homeTeam)}
                    </td>
                    <td>
                      <img
                        alt="visitor logo"
                        src={`/team_logos/${game.visitingTeam}.svg`}
                        width="48"
                        height="48"
                      />
                      {teamName(game.visitingTeam)}
                    </td>

                    <td>
                      <Link to={`/games/${game.gameId}`}>Play-by-play</Link>
                    </td>
                  </tr>
                ))}
          </Table>
          {isError && (
            <Alert variant="danger">
              We encountered an error loading the schedules.
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Schedules;
