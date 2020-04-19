import React from 'react';
import { Component } from "react";

class PlayByPlay extends Component {
    constructor(props) {
        super(props);
        console.log('play by play constructor');
        
        this.state = { game: null };        
        this.getGame(props.gameId);
    }
    componentDidMount() {
        console.log('componentDidMount');        
        this.getGame(this.props.gameId);
    }

    async getGame(gameId) {
        console.log('getGame');
        var baseUrl = "https://bmkj033bof.execute-api.us-west-2.amazonaws.com/dev/v1";
        var json = await fetch(`${baseUrl}/game/${gameId}/playByPlay`)
                    .then(resp => resp.json())
                    .catch(err => console.error(err));
        this.setState( { game: json });
        console.log(json);
    }

    render() {
        console.log('Play By Play render');                        
        return (
            <div>
                <label>{this.state}</label>
                <table>
                    <tr><td>{this.props.gameId}</td></tr>
                    {/* {this.state.game.plays.map(play => <tr><td>{play}</td></tr>)}   */}
                </table>>
            </div>
        );
    }
}

export default PlayByPlay;