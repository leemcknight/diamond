
const aws = require('aws-sdk');
const tableName = "game";
const {parsePlay} = require('./parsePlay');

const docClient = new aws.DynamoDB.DocumentClient();

function parseGame(item) {
    const blob = item.data;
    let game = {        
        plays: [],
        info: {},
        starters: [],
        data: []
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
                game.plays.push(parsePlay(line));
                break;
            case 'sub':
                game.plays.push(line);
                break;
            case 'start':
                game.starters.push({
                    id: parts[1],
                    name: parts[2],
                    team: parts[3] == 0 ? "visitor" : "home",
                    battingOrder: parts[4],
                    fieldPosition: parts[5]
                });
                break;
            case 'info':                
                game.info[parts[1]] = parts[2];
                break;
            case 'com':
                break;          
            case 'data':
                game.data.push(line);
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