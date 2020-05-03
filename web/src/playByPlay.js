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
                <h1><img src={`/team_logos/${data.info.visteam}.svg`} width="128" height="128"/> at <img src={`/team_logos/${data.info.hometeam}.svg`} width="128" height="128"/></h1>
                <h2>{data.info.date}</h2>         
                <h3>{data.info.starttime}</h3>                       
                <div id="gameinfo">                
                    <div class="container">   
                        {innings.map(inning => (
                            <div class="border border-primary mt-4 p-4">
                                <div class="bg-primary text-white"><h3>{inning.side == 0 ? "Top" : "Bottom"} {inning.inning}</h3></div>
                                <div>{inning.plays.map(play => (
                                    <div class="container">                                                               
                                        {play.comment ? <div class="alert alert-primary row" role="alert"><div class="col">{play.comment}</div></div> : null}
                                        {play.substitutions.map(substitution => 
                                            <div class="alert alert-secondary row" role="alert"><div class="col">{substitution}</div></div>
                                            )}
                                        <div class="clearfix border-dark bg-white d-inline row-cols-2">
                                            <div class="col">
                                                {play.playerId + " - " + play.event.description}                                                
                                                <div>
                                                    {play.event.modifiers.map(modifier => (
                                                        <div>{modifier}</div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div class="card col-md-auto">
                                                <button class="btn btn-primary btn-block" type="button" data-toggle="collapse" data-target={`#${play.playerId}${play.inning}${play.side}`} aria-expanded="false" aria-controls={`${play.playerId}${play.inning}${play.side}`}>
                                                    {play.event.shortDescription}
                                                </button>
                                                <div class="collapse" id={`${play.playerId}${play.inning}${play.side}`}>
                                                    {play.pitches.map(pitch => (
                                                        <div class="m-1 p-1">
                                                            {pitch.result}
                                                        </div>
                                                    ))} 
                                                </div>                                                                                
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