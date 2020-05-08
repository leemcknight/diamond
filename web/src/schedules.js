import React from 'react';
import { browserHistory, Router, Route, Link, withRouter } from 'react-router-dom'
import './index.css';
import TeamDropDown from './teamDropDown';

function Schedules() {    
    const gameId = 'CHN201708180';
        
    return (      
    <div id="scheduleWrapper">            
        <div className="Schedule">
            <h3>Find a game</h3>
            <label>
                Team: 
                <div class="dropdown">
                    <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Teams
                    </button>
                    <TeamDropDown />
                </div>
            </label>
            <label>Year: <select name="year">
                </select> </label>
            <label>Month:
                <select name="month">
                    <option name="01">Janurary</option>
                </select>
            </label>
                        
            <Link to={`/games/${gameId}`}>Game Link</Link>
        </div>
    </div>
    );    
  } 

  
  export default Schedules;