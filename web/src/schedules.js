import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


function handleSubmit(event) {
    //this.setState({value: event.target.value});
    
	this.props.history.push('/games/CHN201708180/playByPlay');
}


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
            <label>Month:
                <select name="month">
                    <option name="01">Janurary</option>
                </select>
            </label>
            <form onSubmit={this.handleSubmit()}>
            </form>
        </div>
    );    
  } 

  
  export default Schedules;