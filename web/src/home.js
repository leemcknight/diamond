import React from "react";
import ScheduleForm from "./components/scheduleForm";
import { Container } from "react-bootstrap";

function Home() {
  return (
    <Container>
      <h1 className="display-4">Welcome to Diamond</h1>
      <ScheduleForm />
    </Container>
  );
}

export default Home;
