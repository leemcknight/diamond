import React, { useState } from 'react';
import { Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import './index.css';

function Ballparks() {
   const {ballparks, setBallparks} = useState(); 
   const {error, setError} = useState();
   
    async function getBallparks() {
        setError(null);
        console.log('getBallparks');
        var baseUrl = "https://bmkj033bof.execute-api.us-west-2.amazonaws.com/dev/v1";
        try {
            const response = await fetch(`${baseUrl}/ballparks`);
            const json = await response.json();
            setBallparks(json);
        } catch(error) {
            setError(error);
        }
    }

    if(!ballparks) {
        getBallparks();
    }
    return (
        <Container>
            { error && (<Row><Col><Alert variant='warning'>{error}</Alert></Col></Row>) }
            {ballparks ? ballparks.map(ballpark => (
                <Card className='m-5'>
                    <Card.Header>{ballpark.name}</Card.Header>
                    <Card.Text>
                        <div>{ballpark.start} - {ballpark.end}</div>
                        <div>{ballpark.city}, {ballpark.state}</div>
                    </Card.Text> </Card>
            )) : 
            <Row><Col><Spinner animation='border' /></Col></Row> 
            }
        </Container>
    );
}

export default Ballparks;
