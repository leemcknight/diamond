import React from 'react';
import { browserHistory, Router, Route, Link, withRouter } from 'react-router-dom'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';





function Schedules() {

    function handleSubmit(event) {
        //this.setState({value: event.target.value});
        
        this.props.history.push('/games/CHN201708180/playByPlay');
    }


    const gameId = 'CHN201708180';
    return (        
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
    );    
  } 

  
  export default Schedules;