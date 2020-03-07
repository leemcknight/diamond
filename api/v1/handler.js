'use strict';
const aws = require('aws-sdk');

const dynamo = new aws.DynamoDB();

module.exports.getFranchises =  async (event) => {
  const params = {
    TableName: "franchise"
  };
  return new Promise((resolve, reject) => dynamo.scan(params, (err, data) => {
    if(err) {
      reject(err);
    } else {
      resolve(data);
    } } ));
};

module.exports.getFranchise = async event => {
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

module.exports.getBallparks =  async (event) => {
  const params = {
    TableName: "ballpark"
  };
  return new Promise((resolve, reject) => dynamo.scan(params, (err, data) => {
    if(err) {
      reject(err);
    } else {
      resolve(data);
    } } ));
};

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