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
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link to="/home"><img src="/diamond.png" width="32" /></Link>
        <div class="collapse navbar-collapse mx-4 px-4" id="navbarSupportedContent">
          <ul class="navbar-nav navbar-light">            
            <li class="nav-item dropdown mx-2">
              <div class="dropdown">
                <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Teams
                </button>
                <TeamDropDown />
              </div>
            </li>
            <li class="nav-item mx-2">
              <Link class="nav-link" to="/schedules">Find a game</Link>
            </li>
            <li class="nav-item mx-2">
              <Link class="nav-link" to="/people">Players</Link>
            </li>
            <li class="nav-item mx-2">
              <Link class="nav-link" to="/Ballparks">Ballparks</Link>
            </li>
            <li class="nav-item mx-2">
              <Link class="nav-link" to="About">About</Link>
            </li>                        
          </ul>    
        </div>
      </nav>

    );        
  }
  

  export default MainHeader;