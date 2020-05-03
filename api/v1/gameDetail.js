
const aws = require('aws-sdk');
const tableName = "game";
const {parsePlay} = require('./parsePlay');
const {getLocationString} = require('./fieldLocations');

const docClient = new aws.DynamoDB.DocumentClient();


function parseComment(commentString) {
    return commentString.split(',')[1].replace(/"/g,'').replace('$','');
}

function parseSubstitution(substitutionString) {
    let parts = substitutionString.split(',');
    const name = parts[2].replace(/"/g,'');
    const side = parts[3];
    const pos = getLocationString(parts[5]);
    if(pos > 10) {
        return `${side == '0' ? 'Visiting team' : 'Home team'} brings ${name} in as a ${pos}`;    
    }
    return `${side == '0' ? 'Visiting team' : 'Home team'} moves ${name} to ${pos}`;    
}

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
    let play;
    for(line of lines) {
        const parts = line.split(',');
        const id = parts[0];
        switch(id) {
            case 'id':
                break;
            case 'play':
                play = parsePlay(line);
                game.plays.push(play);
                //if(play.event.description != 'NP') {
                 //   game.plays.push(play);
               // }
                break;
            case 'sub':
                play.substitutions.push(parseSubstitution(line));                
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
                if(play.comment) {
                    play.comment = play.comment + parseComment(line) + " ";
                } else {
                    play.comment = parseComment(line) + " ";
                }
                
                break;          
            case 'data':
                game.data.push(line);
        }   
    }
    return game;
}

module.exports = {
    getGame: id => {                
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