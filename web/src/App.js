import React from 'react';
import Franchises from './franchises';
import Schedules from './schedules';
import People from './people';
import Home from './home';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <MainHeader />
      <div className="MainSection">
        <Router>
          <Switch>
              <Route path="/franchises">
                <Franchises />
              </Route>
              <Route path="/schedules">
                <Schedules />
              </Route>
              <Route path="/people">
                <People />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
        </Router>
      </div>      
      <Footer />
    </div>
  );
}


function Footer() {
  return (
    <div className="DiamondFooter">
      <p> The information used here was obtained free of
     charge from and is copyrighted by Retrosheet.  Interested
     parties may contact Retrosheet at 20 Sunset Rd.,
     Newark, DE 19711.
</p>
    </div>
  );
} 

function MainHeader() {
  let style = {
    float: "right"
  };

  return(
    

    <div id="mainheader">
      <div id="titlebar">
        <ul>
        <li><a href="https://icon-library.net/icon/baseball-icon-vector-2.html" title="Baseball Icon Vector #366708"><img src="https://icon-library.net//images/baseball-icon-vector/baseball-icon-vector-2.jpg" width="48" /></a></li>
        <li>Diamond</li>
        </ul>
      </div>
      <Router>
        <div id="mainmenu">        
          <ul>
            <li><Link to="franchises">Teams</Link></li>
            <li><Link to="schedules">Find a game</Link></li>
            <li><Link to="people">Players</Link></li>
            <li><Link to="ballparks">ballparks</Link></li>
            <li style={style}><a href="#about">About</a></li>
          </ul>
        </div>
      </Router>
    </div>
  );
}

export default App;
