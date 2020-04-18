
const aws = require('aws-sdk');
const dynamo = new aws.DynamoDB();
const tableName = "game";


function convertDynamoResponse(dynamoResponse) {    
    const item = dynamoResponse.Items[0];
    return {
        id: item.id.S,
        blob: item.data.S
    };
}

function parseGame(raw) {
    const blob = raw.blob;    
    return blob;
}

module.exports = {
    getGame: id => {        

        console.log(`getting game: ${id}`);
        var params = {
            TableName : tableName,
            KeyConditionExpression: "#id = :id",
            ExpressionAttributeNames:{
                "#id": "id"
            },
            ExpressionAttributeValues: {
                ":id": id
            }
        };

        return new Promise(            
            (resolve, reject) => dynamo.query(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {                  
                    const raw = convertDynamoResponse(data);
                    const json = parseGame(raw);
                    resolve(json);
                }
            })
        );
    }
}