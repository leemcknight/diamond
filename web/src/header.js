import React from 'react';
import './App.css';
import TeamDropDown from './teamDropDown';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function MainHeader() {
    let style = {
      float: "right",        
    };  
    return(
      <div id="mainheader">        
        <div id="mainmenu">        
          <ul>
            <li><Link to="home"><img src="/diamond.png" width="32" /></Link></li>              
            <li>
              <div class="dropdown">
                <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Teams
                </button>
                <TeamDropDown />
              </div>
            </li>
            <li><Link to="schedules">Find a game</Link></li>
            <li><Link to="people">Players</Link></li>
            <li><Link to="Ballparks">ballparks</Link></li>
            <li style={style}><a href="#about">About</a></li>
          </ul>
        </div>      
      </div>
    );        
  }
  

  export default MainHeader;