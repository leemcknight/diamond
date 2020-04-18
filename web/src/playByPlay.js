import { Component } from "react";

class PlayByPlay extends Component {
    constructor(props) {
        super(props);
        console.log('play by play constructor');
        
        this.state = { game: null };        
        this.getBallparks();
    }
    componentDidMount() {
        console.log('componentDidMount');        
        this.getBallparks();
    }

    async getGame(gameId) {
        console.log('getGame');
        var baseUrl = "https://bmkj033bof.execute-api.us-west-2.amazonaws.com/dev/v1";
        var json = await fetch(`${baseUrl}/ballparks`).then(resp => resp.json()).catch(err => console.error(err));
        this.setState( { ballparks: json });
        console.log(json);
    }

}