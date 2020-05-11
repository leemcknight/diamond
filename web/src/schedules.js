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
            <label>Year: 
                <select class="form-control" id="year">                    
                    <option>2020</option>
                    <option>2019</option>
                    <option>2018</option>
                    <option>2017</option>
                    <option>2016</option>
                </select>
            </label>
            <label>Month:
            <select class="form-control" id="month">                    
                    <option>Jan</option>
                    <option>Feb</option>
                    <option>Mar</option>
                    <option>Apr</option>
                    <option>May</option>
                    <option>Jun</option>
                    <option>Jul</option>
                    <option>Aug</option>
                    <option>Sep</option>
                    <option>Oct</option>
                    <option>Nov</option>
                    <option>Dec</option>
                </select>
            </label>                        
            <Link to={`/games/${gameId}`}>Game Link</Link>
        </div>
    </div>
    );    
  } 

  
  export default Schedules;