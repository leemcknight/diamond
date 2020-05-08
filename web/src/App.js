import React from 'react';
import Franchises from './franchises';
import Schedules from './schedules';
import People from './people';
import Ballparks from './ballparks';
import PlayByPlay from './playByPlay';
import Home from './home';
import MainHeader from './header';
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
      <Router>
        <MainHeader />
        <div className="MainSection">          
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
                <Route path="/games/:gameId">                  
                  <PlayByPlay />
                </Route>
                <Route path="/ballparks">
                  <Ballparks />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>          
        </div>      
      </Router>
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
<p>
Icons made by <a href="https://www.flaticon.com/<?=_('authors/')?>surang" title="surang">surang</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
</p>
    </div>
  );
} 


export default App;
