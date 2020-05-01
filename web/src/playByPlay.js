import React from 'react';
import {useParams} from "react-router-dom";
import { useFetch  } from 'react-async';
import './playByPlay.css'


function groupPlays(plays) {
    let innings = [];
    let currentInning = {};
    let play;
    for(play of plays) {
        if(play.inning == currentInning.inning) {
            currentInning.plays.push(play);
        } else {
            currentInning = {
                plays: [],
                inning: play.inning
            }
            innings.push(currentInning);
        }
    }

    return innings;
}

function PlayByPlay() {
    const {gameId} = useParams();
    const headers = { Accept: "application/json" }
    const baseUrl = "https://bmkj033bof.execute-api.us-west-2.amazonaws.com/dev/v1";
    const { data, error, isPending } = useFetch(`${baseUrl}/game/${gameId}/playByPlay`, { headers })
  
    if(isPending)
        return <h2>Loading...</h2>
    if(error)
        return <h2>We encountered an error.</h2>
    if(data) {
        const innings = groupPlays(data.plays);
        return (
            <div>     
                <h1>{data.info.visteam} at {data.info.hometeam}</h1>
                <h2>{data.info.date}</h2>
                <h2>GameId: {gameId}</h2>                         
                <h2>Game Info:</h2>
                <div id="gameinfo">                
                    <div>   
                        {innings.map(inning => (
                            <div>
                                <div><h3>{inning.inning}</h3></div>
                                <div>{inning.plays.map(play => (
                                    <div>
                                        <div class="play-event">{play.event}</div>
                                        <div class="play-pitches">
                                            <div>{play.pitches.map(pitch => (
                                                <div class="play-pitch">{pitch.result}</div>
                                            ))}
                                            </div>
                                        </div>
                                    </div>
                                    ))}                                
                                </div>                            
                            </div>
                            ))} 
                    </div>                                                                                    
                </div>            
            </div>            
        );
    }
}
export default PlayByPlay;