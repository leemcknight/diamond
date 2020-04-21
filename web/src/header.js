import React from 'react';
import './App.css';

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
        <div id="titlebar">
          <ul>
          <li><img src="./diamond.png" width="48" /></li>
          <li>Diamond</li>
          </ul>
        </div>      
        <div id="mainmenu">        
          <ul>
            <li><img source="./franchise.png" width="32" /><Link to="franchises"> Teams</Link></li>
            <li><img source="./schedule.png" width="32" /><Link to="schedules">Find a game</Link></li>
            <li><Link to="people">Players</Link></li>
            <li><img source="./stadium.png" width="32" /><Link to="ballparks">ballparks</Link></li>
            <li style={style}><a href="#about">About</a></li>
          </ul>
        </div>      
      </div>
    );
  }
  

  export default MainHeader;