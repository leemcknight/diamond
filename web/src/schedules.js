import React from 'react';
import { browserHistory, Router, Route, Link, withRouter } from 'react-router-dom'
import './index.css';
import { useFetch  } from 'react-async';

function Schedules() {    
    const gameId = 'CHN201708180';
    const headers = { Accept: "application/json" }
    const baseUrl = "https://bmkj033bof.execute-api.us-west-2.amazonaws.com/dev/v1";
    const { data, error, isPending } = useFetch(`${baseUrl}/franchises`, { headers });
    const teams = data;


    if(isPending)
        return <h2>Loading...</h2>
    if(error)
        return <h2>We encountered an error.</h2>
    if(data)
        return (      
        <div id="scheduleWrapper">
            <div id="teamsColumn">
                <ul id="teamList">
                    {teams.map(team => <li id="team"><a href="#"> {team.location} {team.nickname}</a></li>)}
                </ul>
            </div>
            <div className="Schedule">
                <h3>Find a game</h3>
                <label>
                    Team Name: 
                    <input type="text" name="name"></input>
                </label>
                <label>Year: <select name="year">
                    </select> </label>
                <label>Month:
                    <select name="month">
                        <option name="01">Janurary</option>
                    </select>
                </label>
                            
                <Link to={`/games/${gameId}/playByPlay`}>Game Link</Link>
            </div>
        </div>
    );    
  } 

  
  export default Schedules;