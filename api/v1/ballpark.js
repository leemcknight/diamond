
const tableName = "ballpark";

function parse(dynamoResponse) {
    resp = JSON.parse(dynamoResponse);
    parks = []
    for(item in resp.Items) {
        park.add({
            city: item.city.S,
            ballpark_id: item.ballpark_id.S,
            end: item.end.S,
            name: item.name.S,
            league: item.league.S,
            start: item.start.S,
            state: item.state.S
        })
    }
    return JSON.stringify(parks);
}

module.exports = {
    getAll: () => {
        const params = {
            TableName: tableName
        };
        return new Promise(
            (resolve, reject) => dynamo.scan(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(parse(data));
                }
            })
        );
    },

    getById: (id) => {

    }
}