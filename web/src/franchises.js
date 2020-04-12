import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

function Franchises() {
    return (
      <div className="Franchises">
          <label>
              Team Name: 
            <input type="text" name="name"></input>
        </label>
      </div>
    );
  } 

  export default Franchises;