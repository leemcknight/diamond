import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

function Schedules() {
    return (        
        <div className="Schedule">
            <h3>Find a game</h3>
            <label>
                Team Name: 
                <input type="text" name="name"></input>
            </label>
            <label>Year: <select name="year">
                </select> </label>
        </div>
    );
  } 

  export default Schedules;