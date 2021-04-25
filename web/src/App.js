import React from 'react';
import Franchises from './franchises';
import Schedules from './schedules';
import People from './people';
import Ballparks from './ballparks';
import PlayByPlay from './playByPlay';
import Home from './home';
import MainHeader from './header';
import About from './about';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route  
} from "react-router-dom";
const {Container, Row, Col} = require('react-bootstrap');


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
                <Route path="/about">
                  <About />
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
    <Container>
        <Row>
            <Col>
                <p> The information used here was obtained free of
                    charge from and is copyrighted by Retrosheet.  Interested
                     parties may contact Retrosheet at 20 Sunset Rd.,
                     Newark, DE 19711.
                </p>
                <p>
                    Icons made by <a href="https://www.flaticon.com/<?=_('authors/')?>surang" title="surang">surang</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
                </p>
            </Col>
        </Row>
    </Container>
  );
} 


export default App;
