const fs = require('fs');
const aws = require('aws-sdk');
const api = require('./ballpark');


jest.mock('aws-sdk');

const dynamo = new aws.DynamoDB({region: 'us-west-2'});

test('parse dynamo json', () => {
  buf = fs.readFileSync('./v1/test/dynamo_ballparks.json');
  let dynamoResponse = JSON.parse(buf);
  let parks = [];
  for(const item of dynamoResponse.Items) {
      console.log(JSON.stringify(item));
        let league;
        let end;
        if(item.league != undefined) {
            league = item.league.S;
        }
        if(item.end != undefined) {
            end = item.end.S;
        }
        parks.push({
            city: item.city.S,
            ballpark_id: item.ballpark_id.S,
            end: end,
            name: item.name.S,
            league: league,
            start: item.start.S,
            state: item.state.S
        })
}
})
/*
test('ballpark dynamo parser', () => {
    dynamo.scan = jest.fn((params, callback) => {
        buf = fs.readFileSync('./test/dynamo_ballparks.json');
        return buf;
    });

    json = api.getAll();
    expect(json).not.toBe(undefined);
    console.log(json);
})
*/