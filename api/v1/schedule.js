
const aws = require('aws-sdk');

const dynamo = new aws.DynamoDB();
const tableName = "schedule";


module.exports = {
    getMontlyGames: (year, month) => {
        
    },

    getDailyGames: (year, month, day) => {

    }
}