import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

class Ballparks extends Component {
    constructor(props) {
        super(props);
        console.log('ballparks constructor');
        
        this.state = { ballparks: [] };        
        this.getBallparks();
    }
    componentDidMount() {
        console.log('componentDidMount');        
        this.getBallparks();
    }

    async getBallparks() {
        console.log('getBallparks');
        var baseUrl = "https://bmkj033bof.execute-api.us-west-2.amazonaws.com/dev/v1";
        var json = await fetch(`${baseUrl}/ballparks`).then(resp => resp.json()).catch(err => console.error(err));
        this.setState( { ballparks: json });
        console.log(json);
    }

    render() {
        console.log('Ballparks render');                        
        return (

            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Ballparks
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {this.state.ballparks.map(ballpark => <a class="dropdown-item" href="#">{ballpark.name}</a>)}                    
                </div>
            </div>


            /*
            <div>
                <select name="ballparks"> 
                    {this.state.ballparks.map(ballpark => <option>{ballpark.name}</option>)}
                </select>
            </div>
            */
        );
    }
}

export default Ballparks;