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
        return (
            <div>
                {this.state.ballparks.map(ballpark => 
                    <div class="card m-5">
                        <h5 class="card-header">{ballpark.name}</h5>
                        <div class="card-text">
                            <div>{ballpark.start} - {ballpark.end}</div>
                            <div>{ballpark.city}, {ballpark.state}</div>
                        </div>
                    </div>
                    )}
            </div>
        );
    }
}

export default Ballparks;