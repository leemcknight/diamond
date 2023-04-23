import React from "react";
import { useFetch } from "react-async";
import { DropdownButton, Dropdown, Spinner, Form } from "react-bootstrap";
import { useGetFranchisesQuery } from "../services/diamond";

export function TeamDropDown(): JSX.Element {
  const {
    data: teams,
    isLoading,
    isSuccess,
    error,
    isError,
  } = useGetFranchisesQuery();
  return (
    <Form.FloatingLabel label="Team" controlId="franchise">
      <Form.Select id="franchise">
        {isSuccess &&
          teams.map((team) => (
            <option
              key={team.id}
              value={team.id}
            >{`${team.location} ${team.nickname}`}</option>
          ))}
      </Form.Select>
    </Form.FloatingLabel>
  );
}
