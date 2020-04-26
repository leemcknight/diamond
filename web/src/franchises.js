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
        <div className="Franchises">
            <div id="teamsColumn">
                  <ul id="teamList">
                      {teams.map(team => <li id="team"><a href="#"> {team.location} {team.nickname}</a></li>)}
                  </ul>
              </div>
        </div>
      );
  } 

  export default Franchises;