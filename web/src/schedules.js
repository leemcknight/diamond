import './index.css';
import React, { useState } from 'react';
import ScheduleForm from './scheduleForm';
const { Container, Row, Col, Card, CardDeck, Alert } = require('react-bootstrap');
const moment = require('moment');



function Schedules() {
    const [schedule, setSchedule] = useState();
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState();
    const [scheduleFilter, setScheduleFilter] = useState({
        year: '2017',
        month: '08',
        team: 'CHN'
    });

    async function getSchedule(scheduleFilter) {
        const headers = { Accept: "application/json" }
        const baseUrl = "https://bmkj033bof.execute-api.us-west-2.amazonaws.com/dev/v1";
        const result = await fetch(`${baseUrl}/schedule/${scheduleFilter.year}/${scheduleFilter.month}`, { headers });
        const json = await result.json();
        return json;
    }

    async function scheduleCallback(form) {
        setBusy(true)
        try {
            const result = await getSchedule(form);
            setSchedule(result);
        } catch (error) {
            setError(error);
        }
        setBusy(false);
    }
    return (
        <Container>
            <Row>
                <Col><ScheduleForm scheduleCallback={scheduleCallback} /></Col>
            </Row>
            <Row>
                <Col lg='5' md='3'>
                <CardDeck>
                {schedule && schedule.data ? 
                    schedule.data.filter(game=> game.home === scheduleFilter.team || 
                                    game.visitor === scheduleFilter.team)
                            .map(game => 
                                <Card className='m-5'>
                                    <Card.Header>{moment(game.date, 'YYYYMMDD').format('MM/DD/YYYY')}</Card.Header>
                                    <Card.Body>
                                        <img alt='visitor logo' src={`/team_logos/${game.visitor}.svg`} width="64" height="64" />
                                        at
                                        <img alt='home logo' src={`/team_logos/${game.home}.svg`} width="64" height="64" />
                                       <Card.Text> 
                                        <a href={`/games/${game.gameId}`}>Play by Play</a>
                                        </Card.Text>
                                    </Card.Body>
					            </Card>)
                        :  null
                }

                {schedule && schedule.error ? <Alert varaint='danger'>
                                        We encountered an error loading the schedules.
                                        </Alert> :  null}
                    </CardDeck>
                </Col>
            </Row>
        </Container>
        );    
}


export default Schedules;
