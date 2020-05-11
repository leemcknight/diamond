
const aws = require('aws-sdk');

const dynamo = new aws.DynamoDB();
const tableName = "schedule";

function convertDynamoResponse(dynamoResponse) {    
    let schedule = [];
    for (const item of dynamoResponse.Items) {                
        schedule.push({
            yearMonth: item.year_month.S,
            gameId: item.game_id.S,
            date: item.date.S,
            dayOfWeek: item.day_of_week.S,
            dateNightIndicator: item.day_night_ind.S,
            game_number: item.game_number.S,
            home: item.home.S,
            homeGameNumber: item.home_game_number.S,
            homeLeague: item.home_league.S,
            visitor: item.visitor.S,
            visitorGameNumber: item.visitor_game_number.S,
            visitorLeague: item.visitor_league.S
        });        
    }
    return schedule;
}

module.exports = {
    getMonthlyGames: (year, month) => {

        const yearMonth = year + month;
        const params = {
            TableName: tableName,
            KeyConditionExpression: 'year_month = :year_month',   
            ExpressionAttributeValues: {
                ':year_month': {'S': yearMonth}
            }         
        };        

        return new Promise(
            (resolve, reject) => dynamo.query(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {                        
                    resolve(convertDynamoResponse(data));
                }
            })
        );
    }    
}