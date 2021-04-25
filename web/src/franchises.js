import React from 'react';
import './index.css';
import { useFetch  } from 'react-async';


function Franchises() {
    const headers = { Accept: "application/json" }
    const baseUrl = "https://bmkj033bof.execute-api.us-west-2.amazonaws.com/dev/v1";
    const { data, error, isPending } = useFetch(`${baseUrl}/franchises`, { headers });
    const teams = data;
    if(isPending)
      return <h2>Loading...</h2>
    if(error)
      return <h2>We encountered an error.</h2>
    if(data)
      return (        
        <div>
            {teams.map(team => 
              <div class="card m-5 w-50">
                <img alt='team logo' src={`/team_logos/${team.current_franchise_id}.svg`} width="128" height="128" class="card-img-top"></img>
                <div class="card-body">
                  <h5 class="card-title">{team.location} {team.nickname}</h5>
                  <p class="card-text">{team.city}, {team.state}</p>
                  <p class="card-text">{team.first_game} - {team.last_game}</p>
                  <p class="card-text">{team.league}</p>                  
                </div>
              </div>)}                
        </div>
      );
  } 

  export default Franchises;
