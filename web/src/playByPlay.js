import React from 'react';
import {useParams} from "react-router-dom";
import { useFetch  } from 'react-async';

function PlayByPlay() {
    const {gameId} = useParams();
    const headers = { Accept: "application/json" }
    const baseUrl = "https://bmkj033bof.execute-api.us-west-2.amazonaws.com/dev/v1";
    const { data, error, isPending } = useFetch(`${baseUrl}/game/${gameId}/playByPlay`, { headers })
  
    if(isPending)
        return <h2>Loading...</h2>
    if(error)
        return <h2>We encountered an error.</h2>
    if(data)
    return (
        <div>     
            <h1>{data.info.visteam} at {data.info.hometeam}</h1>
            <h2>{data.info.date}</h2>
            <h2>GameId: {gameId}</h2>                         
            <h2>Game Info:</h2>
            <div id="gameinfo">

            </div>
            <div>   
                {data.plays.map(play => (
                    <div>{JSON.stringify(play)}</div>

                ))}                                                                 
            </div>            
        </div>
    );
}
export default PlayByPlay;