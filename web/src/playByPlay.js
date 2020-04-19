import React from 'react';
import {useParams} from "react-router-dom";
import { useAsync, Async, useFetch  } from 'react-async';

function PlayByPlay() {
    const {gameId} = useParams();
    const headers = { Accept: "application/json" }
    const baseUrl = "https://bmkj033bof.execute-api.us-west-2.amazonaws.com/dev/v1";
    const { data, error, isPending, run } = useFetch(`${baseUrl}/game/${gameId}/playByPlay`, { headers })
  
    return (
        <div>     
            <h1>Game Play By Play</h1>   
            <h2>GameId: {gameId}</h2>                         
            <div>   
                {data.plays.map(play => (
                    return <div>{JSON.stringify(play)}</div>

                ))}                                                 
                <div>

                    {JSON.stringify(data)}
                </div>                    
            </div>            
        </div>
    );
}
/*
class PlayByPlay extends Component {
    constructor(props) {
        super(props);
        console.log('play by play constructor');        
        this.state = { game: null };                
    }
    componentDidMount() {
        console.log('componentDidMount');   
        
        let gameId = useParams();
        this.getGame(gameId);
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
        return (
            <div>                
                <table>
                    <tr><td>GameId: {this.props.gameId}</td></tr>                    
                </table>
            </div>
        );
    }
}
*/

export default PlayByPlay;