import React from 'react';
import {useParams} from "react-router-dom";
import { useFetch  } from 'react-async';
import './playByPlay.css'
const {Container, Row, Col, Card} = require('react-bootstrap');

function inningSuffix(inning) {
    if(inning >= 4) {
        return 'th';
    } else if(inning === 1) {
        return 'st';
    } else if(inning === 2) {
        return 'nd';
    } else if(inning === 3) {
        return 'rd';
    }
}

function groupPlays(plays) {
    let innings = [];
    let currentInning = {};
    let play;
    for(play of plays) {
        if(play.inning === currentInning.inning && play.side === currentInning.side) {
            currentInning.plays.push(play);
        } else {
            currentInning = {
                plays: [],
                inning: play.inning,
                side: play.side
            };
            if(play.side === 0 || play.side === 1) {
               currentInning.plays.push(play);
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
    const { data, error, isPending } = useFetch(`${baseUrl}/game/${gameId}/playByPlay`, { headers });
    const [currentInning, setCurrentInning] = React.useState(1);    
    if(isPending)
        return <h2>Loading...</h2>
    if(error)
        return <h2>We encountered an error.</h2>
    if(data) {
        const innings = groupPlays(data.plays);
        return (
        <Container>
            <Row>
                <Col className='m-4'><img alt='visiting team logo' src={`/team_logos/${data.info.visteam}.svg`} width="128" height="128"/> at <img alt='home team logo' src={`/team_logos/${data.info.hometeam}.svg`} width="128" height="128"/>
                </Col>
            </Row>
            <Row>
                <Col>{data.info.date}
                </Col>
            </Row>
            <Row><Col>{data.info.starttime}</Col></Row>
            <Row>
                <Container className='border'>
                    <Row className='border-bottom md-auto'>
                        <Col className='md-auto'>Final></Col>
                            {data.log.box.map(inning => (
                                <Col className='md-auto'>{inning.i}</Col>
                            ))}                            
                            <Col className='md-auto'>R</Col>
                            <Col className='md-auto'>H</Col>
                            <Col className='md-auto'>E</Col>
                    </Row>
                    <Row className='border-bottom'>
                        <Col className='md-auto'>{data.info.visteam}</Col>
                            {data.log.box.map(inning => (
                                <Col className='md-auto'>{inning.v}</Col>
                            ))}
                            <Col className='md-auto'>{data.log.visitorScore}</Col>
                            <Col className='md-auto'>{data.log.visitorHits}</Col>
                            <Col className='md-auto'>{data.log.visitorErrors}</Col>
                    </Row>
                    <Row> 
                        <Col className='md-auto'>{data.info.hometeam}</Col>
                            {data.log.box.map(inning => (
                                <Col className='md-auto'>{inning.h}</Col>
                            ))}
                            <Col className='md-auto'>{data.log.homeScore}</Col>
                            <Col className='md-auto'>{data.log.homeHits}</Col>
                            <Col className='md-auto'>{data.log.homeErrors}</Col>
                    </Row>
                    
                </Container>                   
               </Row>
               <Row>
                <Container id='gameinfo'>   

                <div class="btn-toolbar justify-content-md-center m-4" role="toolbar" aria-label="Toolbar with button groups">
                    <div class="btn-group mr-2" role="group" aria-label="First group">
                    {innings.map(inning => 
                            inning.side === 0 ? <button type="button" class="btn btn-success" onClick={() => setCurrentInning(inning.inning)}>{inning.inning}</button> : null
                        )}
                    </div>                    
                </div>

                    <div>   
                        {innings.filter(inning => inning.inning === currentInning)
                                .map(inning => (
                            <Card className='m-4 w-50'>
                                <Card.Header>{inning.side === 0 ? "Top" : "Bottom"} of the {inning.inning} {inningSuffix(inning.inning)}</Card.Header>
                                <Card.Body>{inning.plays.map(play => (
                                    <div class="p-2">                                                                                                       
                                        {play.substitutions.map(substitution => 
                                            <div class="alert alert-secondary" role="alert"><div class="col">{substitution}</div></div>
                                            )}
                                        {play.event.shortDescription !== 'NP' ?     
                                        <div class="clearfix bg-white">
                                            <div class="float-left">
                                                <ul class="list-group">
                                                    <li class="list-group-item">{ `${play.player} ${play.event.description}`}
                                                        {play.event.modifiers.map(modifier => (
                                                            ` ${modifier}`
                                                        ))}
                                                    </li> 
                                                    {play.event.advance ? play.event.advance.map(advance => (
                                                        <li class="list-group-item list-group-item-success">{advance}</li>
                                                    )) : null}</ul>
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
                                        {play.comment ? <div class="alert alert-primary p-2" role="alert"><div class="col">{play.comment}</div></div> : null}
                                    </div>
                                    ))}                                
                                </Card.Body>                            
                            </Card>
                            ))} 
                    </div>                                                                                    
                </Container>            
            </Row>
            </Container>            
        );
    }
}
export default PlayByPlay;
