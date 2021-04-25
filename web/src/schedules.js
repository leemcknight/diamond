import React, { useState } from 'react';
import './index.css';
import { useFetch  } from 'react-async';
import ScheduleForm from './scheduleForm';
const moment = require('moment');

function Schedules() {
    const [scheduleFilter] = useState({
        year: '2017',
        month: '08',
        team: 'CHN'
    });
    const headers = { Accept: "application/json" }
    const baseUrl = "https://bmkj033bof.execute-api.us-west-2.amazonaws.com/dev/v1";
    let pending = true;
    let results;    
    results = useFetch(`${baseUrl}/schedule/${scheduleFilter.year}/${scheduleFilter.month}`, { headers });
    return (
        <div>
            <div id="wrapper">            
                <ScheduleForm />
            </div>
            <div id="gameResults">
            {results && results.data ? 
                results.data.filter(game=> game.home === scheduleFilter.team || 
                                    game.visitor === scheduleFilter.team)
                            .map(game => 
                                <div class="card m-5 w-25">
                                    <div class="card-header">{moment(game.date, 'YYYYMMDD').format('MM/DD/YYYY')}</div>
                                    <div>
                                        <img src={`/team_logos/${game.visitor}.svg`} width="64" height="64" />
                                        at
                                        <img src={`/team_logos/${game.home}.svg`} width="64" height="64" />
                                        
                                    </div>
                                    <a href={`/games/${game.gameId}`}>Play by Play</a>
					            </div>)
                        :  null
            }

            {results && results.error ? <div class="alert alert-danger" role="alert">
                                        We encountered an error loading the schedules.
                                        </div> :  null}
            </div>
            <div>
            </div>
        </div>
        );    
}


export default Schedules;
