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

                <div class="container border">
                    <div class="row border-bottom">
                        <div class="col">Final</div>
                            {data.log.box.map(inning => (
                                <div class="col">{inning.i}</div>
                            ))}                            
                            <div class="col">R</div>
                            <div class="col">H</div>
                            <div class="col">E</div>
                    </div>
                    <div class="row border-bottom">
                        <div class="col">{data.info.visteam}</div>
                            {data.log.box.map(inning => (
                                <div class="col">{inning.v}</div>
                            ))}
                            <div class="col">{data.log.visitorScore}</div>
                            <div class="col">{data.log.visitorHits}</div>
                            <div class="col">{data.log.visitorErrors}</div>
                    </div>
                    <div class="row">
                        <div class="col">{data.info.hometeam}</div>
                            {data.log.box.map(inning => (
                                <div class="col">{inning.h}</div>
                            ))}
                            <div class="col">{data.log.homeScore}</div>
                            <div class="col">{data.log.homeHits}</div>
                            <div class="col">{data.log.homeErrors}</div>
                    </div>
                    
                </div>                   
                <div id="gameinfo">   

                <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                    <div class="btn-group mr-2" role="group" aria-label="First group">
                    {innings.map(inning => 
                            inning.side == 0 ? <button type="button" class="btn btn-secondary">{inning.inning}</button> : null
                        )}
                    </div>                    
                </div>

                    <div>   
                        {innings.map(inning => (
                            <div class="m-4 w-50 card">
                                <div class="card-header">{inning.side == 0 ? "Top" : "Bottom"} {inning.inning}</div>
                                <div class="card-body">{inning.plays.map(play => (
                                    <div>                                                               
                                        
                                        {play.substitutions.map(substitution => 
                                            <div class="alert alert-secondary" role="alert"><div class="col">{substitution}</div></div>
                                            )}
                                        {play.event.shortDescription != 'NP' ?     
                                        <div class="clearfix bg-white">
                                            <div class="float-left">
                                                {play.playerId + " - " + play.event.description}                                                                                                
                                                    {play.event.modifiers.map(modifier => (
                                                        <div>{modifier}</div>
                                                    ))}                                                
                                            </div>
                                            <div class="float-right">
                                                <button class="btn btn-primary btn-block" type="button" data-toggle="collapse" data-target={`#${play.playerId}${play.inning}${play.side}`} aria-expanded="false" aria-controls={`${play.playerId}${play.inning}${play.side}`}>
                                                    {play.event.shortDescription}
                                                </button>
                                                <div class="collapse border border-primary" id={`${play.playerId}${play.inning}${play.side}`}>
                                                    {play.pitches.map(pitch => (
                                                        <div class="m-1 p-1">
                                                            {pitch.result}
                                                        </div>
                                                    ))} 
                                                </div>                                                                                
                                            </div>
                                        </div>
                                        : null}
                                        {play.comment ? <div class="alert alert-primary" role="alert"><div class="col">{play.comment}</div></div> : null}
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