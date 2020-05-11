const aws = require('aws-sdk');
const docClient = new aws.DynamoDB.DocumentClient();

function buildKeyArray(ids) {
    let arr = [];
    for(id of ids) {
        arr.push( {
            'person_id': {
                S: id
            }
        });
    }
    return arr;
}

function parsePeople(dynamoResponse) {
    console.log(`dynamo response: ${JSON.stringify(dynamoResponse)}`);
    let people = [];
    for (const item of dynamoResponse.Items) {                
        people.push({
            id: item.person_id.S,
            firstName: item.first.S,
            lastName: item.last.S
        });        
    }
    return people;
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

        console.log(`params: ${JSON.stringify(params)}`);
        return new Promise(            
            (resolve, reject) => docClient.batchGet(params, (err, data) => {
                if (err) {
                    console.error(JSON.stringify(err));
                    reject(err);
                } else {                                      
                    const people = parsePeople(data);
                    resolve(people);
                }
            })
        );
    }
}