import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

function People() {
    return (
      <div className="People">
          <label>
              Person: 
            <input type="text" name="name"></input>
        </label>
      </div>
    );
  } 

  export default People;