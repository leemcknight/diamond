const aws = require('aws-sdk');

const dynamo = new aws.DynamoDB();
const tableName = "ballpark";

function convertDynamoResponse(dynamoResponse) {    
    let parks = [];
    for (const item of dynamoResponse.Items) {        
        let league;
        let end;
        if (item.league != undefined) {
            league = item.league.S;
        }
        if (item.end != undefined) {
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
        });        
    }
    return parks;
}

    module.exports = {
        getAll: async () => {
            const params = {
                TableName: tableName
            };
            return new Promise(
                (resolve, reject) => dynamo.scan(params, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {                        
                        resolve(convertDynamoResponse(data));
                    }
                })
            );
        },

        getById: (id) => {

        }
    }