'use strict';
const aws = require('aws-sdk');
const ballpark = require('../ballpark');
const franchise = require('../franchise');
const schedule = require('../schedule');
const gameDetail = require('../gameDetail');

const dynamo = new aws.DynamoDB();

module.exports.getFranchises = async (event) => {
  const franchises = await franchise.all();
  let response = {
    isBase64Encoded: false,
    statusCode: 200,    
    headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
    body: JSON.stringify(franchises)
  };
  return Promise.resolve(response);
};

module.exports.filterFranchises = async (event) => {
  const name = event.pathParameters[0];
  const franchises = await franchise.filter(name);
  let response = {
    isBase64Encoded: false,
    statusCode: 200,    
    headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
    body: JSON.stringify(franchises)
  };
  return Promise.resolve(response);
};

module.exports.getMonthSchedule = async event => {
    const {month, year} =  event.pathParameters;
}

module.exports.getDaySchedule = async event => {
    const {month, year, day} =  event.pathParameters;    
}


module.exports.getBallparks = async event => {  
  const parks = await ballpark.getAll();
  let response = {
    isBase64Encoded: false,
    statusCode: 200,    
    headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
    body: JSON.stringify(parks)
  };
  return Promise.resolve(response);
};

module.exports.getGameDetails = async event => {
  const {id} = event.pathParameters;
  const game = await gameDetail.getGame(id);
  let response = {
    statusCode: 200,
    headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
    body: JSON.stringify(game)
  }
  return Promise.resolve(response);
}

module.exports.getPerson = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};