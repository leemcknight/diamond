import React from 'react';
import {useParams} from "react-router-dom";
import { useFetch  } from 'react-async';
import './playByPlay.css'


function inningSuffix(inning) {
    if(inning >= 4) {
        return 'th';
    } else if(inning == 1) {
        return 'st';
    } else if(inning == 2) {
        return 'nd';
    } else if(inning == 3) {
        return 'rd';
    }
}



function groupPlays(plays) {
    let innings = [];
    let currentInning = {};
    let play;
    for(play of plays) {
        if(play.inning == currentInning.inning && play.side == currentInning.side) {
            currentInning.plays.push(play);
        } else {
            currentInning = {
                plays: [],
                inning: play.inning,
                side: play.side
            };
            if(play.side == 0 || play.side == 1) {
               currentInning.plays.push(play);
            }
            innings.push(currentInning);
        }
    }

    return innings;
}

function playerDetails(gameState) {
    let res = {}
    if(gameState.isPending) {
        res.isPending = true;
    }
    if(gameState.error) {
        res.error = true;
    }
    if(gameState.data) {

    }
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
                <h1><img src={`/team_logos/${data.info.visteam}.svg`} width="64" height="64"/> at <img src={`/team_logos/${data.info.hometeam}.svg`} width="64" height="64"/></h1>
                <h2>{data.info.date}</h2>
                <h2>GameId: {gameId}</h2>                         
                <h2>Game Info:</h2>
                <div id="gameinfo">                
                    <div class="container">   
                        {innings.map(inning => (
                            <div class="shadow-sm p-3 mb-5 bg-white rounded border border-primary">
                                <div><h3>{inning.side == 0 ? "Top" : "Bottom"} {inning.inning}</h3></div>
                                <div>{inning.plays.map(play => (
                                    <div class="clearfix border-dark">
                                        <div class="float-left">
                                            {play.playerId + " - " + play.event.description}
                                            <ul>
                                                {play.event.modifiers.map(modifier => (
                                                    <li>
                                                        {modifier}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div class="card float-right">
                                            <button class="btn btn-primary btn-block btn-sm" type="button" data-toggle="collapse" data-target={`#${play.playerId}${play.inning}${play.side}`} aria-expanded="false" aria-controls={`${play.playerId}${play.inning}${play.side}`}>
                                                {play.event.shortDescription}
                                            </button>
                                            <div class="collapse" id={`${play.playerId}${play.inning}${play.side}`}>
                                                {play.pitches.map(pitch => (
                                                    <div class="card card-body">
                                                        {pitch.result}
                                                    </div>
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