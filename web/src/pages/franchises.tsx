import React from "react";
import { useGetFranchisesQuery } from "../services/diamond";
import { safeDateString } from "../util/date";

export function Franchises(): JSX.Element {
  const {
    data: teams,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetFranchisesQuery();

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>We encountered an error.</h2>;

  return (
    <div>
      {teams &&
        teams.map((team) => (
          <div className="card m-5 w-50">
            <img
              alt="team logo"
              src={`/team_logos/${team.currentFranchiseId}.svg`}
              width="128"
              height="128"
              className="card-img-top"
            ></img>
            <div className="card-body">
              <h5 className="card-title">
                {team.location} {team.nickname}
              </h5>
              <p className="card-text">
                {team.location}, {team.state}
              </p>
              <p className="card-text">
                {safeDateString(team.firstGameDate)} -{" "}
                {safeDateString(team.lastGameDate)}
              </p>
              <p className="card-text">{team.league}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
