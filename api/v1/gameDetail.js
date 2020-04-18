
const aws = require('aws-sdk');
const dynamo = new aws.DynamoDB();
const tableName = "game";

const docClient = new aws.DynamoDB.DocumentClient();

function parseGame(item) {
    const blob = item.data;
    let game = {        
        plays: [],
        info: []
    };
    const lines = blob.split('\n');
    game.game_id = item.game_id;    
    let line;
    for(line of lines) {
        const parts = line.split(',');
        const id = parts[0];
        switch(id) {
            case 'id':
                break;
            case 'play':
                game.plays.push(line);
                break;
            case 'sub':
                break;
            case 'start':
                break;
            case 'info':
                game.info[line[1]] = line[2];
                break;
            case 'com':
                break;            
        }
    }
    return game;
}

module.exports = {
    getGame: id => {        

        console.log(`getting game: ${id}`);
        var params = {
            TableName : tableName,
            KeyConditionExpression: "#game_id = :game_id",
            ExpressionAttributeNames:{
                "#game_id": "game_id"
            },
            ExpressionAttributeValues: {
                ":game_id": id
            }
        };

        return new Promise(            
            (resolve, reject) => docClient.query(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {                                      
                    const game = parseGame(data.Items[0]);
                    resolve(game);
                }
            })
        );
    }
}