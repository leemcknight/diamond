import React, { useState } from 'react';
import './index.css';
import { useFetch  } from 'react-async';
import ScheduleForm from './scheduleForm';

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
    console.log(`getting schedule for ${scheduleFilter.year}, ${scheduleFilter.month}`);
    results = useFetch(`${baseUrl}/schedule/${scheduleFilter.year}/${scheduleFilter.month}`, { headers });
    pending = results.isPending;    
    return (
        <div>
            <div id="wrapper">            
                <ScheduleForm />
            </div>
            <div id="gameResults">
            {results && results.data ? 
                results.data.filter(game=> game.home === scheduleFilter.team || 
                                    game.visitor === scheduleFilter.team)
                            .map(game => <div>
						<img src={`/team_logos/${game.visitor}.svg`} width="64" height="64" />
						at
						<img src={`/team_logos/${game.home}.svg`} width="64" height="64" />
						<a href={`/games/${game.gameId}`}>{game.gameId}</a>
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
