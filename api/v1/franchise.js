
const aws = require('aws-sdk');

const dynamo = new aws.DynamoDB();
const tableName = "franchise";


function convertDynamoResponse(dynamoResponse) {    
    let franchises = [];
    for (const item of dynamoResponse.Items) {        
        let division;
        let last_game;
        if (item.division != undefined) {
            division = item.division.S;
        }
        if (item.last_game != undefined) {
            last_game = item.last_game.S;
        }
        franchises.push({
            city: item.city.S,
            franchise_id: item.franchise_id.S,
            current_franchise_id: item.current_franchise_id.S,
            first_game: item.first_game.S,
            league: item.league.S,
            location: item.location.S,
            nickname: item.nickname.S,
            original_franchise_id: item.original_franchise_id.S,
            last_game: last_game,
            division: division
        });        
    }
    return franchises;
}

module.exports = {
    all: () => {
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

    filter: name => {
        
        const params = {
            TableName: tableName,
            FilterExpression: `contains (#location, ${name}) OR contains(nickname, ${name})`,
            ExpressionAttributeNames: {
                "#location": "location"
              }
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
    }
}