import React from 'react';
import './index.css';
import ScheduleForm from './scheduleForm';

function Home() {
    return (
      <div className="jumbotron m-5">
        <h1 class="display-4">Welcome to Diamond</h1>
        <ScheduleForm />
      </div>
    );
  } 

  export default Home;
