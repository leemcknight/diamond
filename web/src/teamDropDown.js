import React from 'react';
import './index.css';
import { useFetch  } from 'react-async';
const { DropDownButton, DropDown } = require('react-bootstrap');

function TeamDropDown() {

    const headers = { Accept: "application/json" }
    const baseUrl = "https://bmkj033bof.execute-api.us-west-2.amazonaws.com/dev/v1";
    const { data, error, isPending } = useFetch(`${baseUrl}/franchises`, { headers });
    const teams = data;
    if(isPending)
      return (        
            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            );
    if(error)
      return <h2>We encountered an error.</h2>
    if(teams)
        return (                    
        <DropDownButton id='teamDropDown' title='Team'>
            {teams.map(team => <DropDown.Item href="#">{team.location} {team.nickname}</DropDown.Item>)}            
        </DropDownButton>        
    );
}

export default TeamDropDown;
