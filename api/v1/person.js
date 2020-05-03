const aws = require('aws-sdk');
const docClient = new aws.DynamoDB.DocumentClient();

function buildKeyArray(ids) {
    let arr = [];
    for(id of ids) {
        arr.push( {
            'personId': {
                S: id
            }
        });
    }
    return arr;
}

module.exports = {    
    getPerson: async id => {

    },

    getPeople: async ids => {
        var params = {
            RequestItems: {
                'person': {
                  Keys: buildKeyArray(ids)                  
                }
              }            
        };

        return new Promise(            
            (resolve, reject) => docClient.batchGet(params, (err, data) => {
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