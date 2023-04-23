import React, { ReactPropTypes } from "react";
import { TeamDropDown } from "./teamDropDown";
import { TTeamSchedule } from "../types";
import { Col, FloatingLabel, Form, FormGroup, Row } from "react-bootstrap";
const { Dropdown, Button } = require("react-bootstrap");

type TProps = {
  scheduleCallback: (schedule: TTeamSchedule) => void;
};

interface FormElements extends HTMLFormControlsCollection {
  year: HTMLInputElement;
  month: HTMLInputElement;
  team: HTMLInputElement;
}

interface ScheduleFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

function ScheduleForm({ scheduleCallback }: TProps): JSX.Element {
  function handleSubmit(event: React.FormEvent<ScheduleFormElement>) {
    event.stopPropagation();
    event.preventDefault();
    const form = event.currentTarget.elements;
    const scheduleForm = {
      year: form.year.value,
      month: form.month.value,
      //team: form.team.value,
    } as TTeamSchedule;
    scheduleCallback(scheduleForm);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <FormGroup>
            <FloatingLabel controlId="year" label="Year" className="mb-3">
              <Form.Select id="year">
                <option selected>2020</option>
                <option key="2019">2019</option>
                <option key="2018">2018</option>
                <option key="2017">2017</option>
                <option key="2016">2016</option>
              </Form.Select>
            </FloatingLabel>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <FloatingLabel controlId="month" label="Month" className="mb-3">
              <Form.Select id="month">
                <option value="01">Jan</option>
                <option value="02">Feb</option>
                <option value="03">Mar</option>
                <option value="04">Apr</option>
                <option value="05">May</option>
                <option value="06">Jun</option>
                <option value="07">Jul</option>
                <option value="08">Aug</option>
                <option value="09">Sep</option>
                <option value="10">Oct</option>
                <option value="11">Nov</option>
                <option value="12">Dec</option>
              </Form.Select>
            </FloatingLabel>
          </FormGroup>
          <FormGroup>
            <TeamDropDown />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Button type="submit">Submit</Button>
      </Row>
    </Form>
  );
}

export default ScheduleForm;
