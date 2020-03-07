import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

class Ballparks extends Component {
    componentDidMount() {
        fetch(`${baseUrl}/ballparks`).then(res => res.json()).then(data => this.setState({
            ballparks: data
        })).catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <select name="ballparks"> 
                    
                </select>
            </div>
        );
    }
}

  export default People;