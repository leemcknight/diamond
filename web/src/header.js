import React from 'react';
import './App.css';
import {
  Link
} from "react-router-dom";

function MainHeader() {
    return(            
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link to="/home"><img alt='diamond logo' src="/diamond.png" width="32" /></Link>
        <div class="collapse navbar-collapse mx-4 px-4" id="navbarSupportedContent">
          <ul class="navbar-nav navbar-light">            
            <li class="nav-item mx-2">
              <Link class="nav-link" to="/franchises">Teams</Link>
            </li>
            <li class="nav-item mx-2">
              <Link class="nav-link" to="/schedules">Schedules</Link>
            </li>
            <li class="nav-item mx-2">
              <Link class="nav-link" to="/people">Players</Link>
            </li>
            <li class="nav-item mx-2">
              <Link class="nav-link" to="/ballparks">Ballparks</Link>
            </li>
            <li class="nav-item mx-2">
              <Link class="nav-link" to="/about">About</Link>
            </li>                        
          </ul>    
        </div>        
      </nav>

    );        
  }
  

  export default MainHeader;
