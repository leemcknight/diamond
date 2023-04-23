import { DynamoDB } from "aws-sdk";
import { TDynamoKey, getByKey } from "./dynamoReader";
import { Franchise } from "../types";
import * as aws from "aws-sdk";

export function getFranchises(): Promise<Franchise[]> {
  const key = {
    partitionKey: "franchise",
  } as TDynamoKey;
  const franchises = getByKey<Franchise>(key);
  return franchises;
}

export async function filterFranchises(name: string): Promise<Franchise[]> {
  const dynamo = new aws.DynamoDB.DocumentClient();
  const params = {
    TableName: "diamond",
    FilterExpression: `contains (#location, ${name})`,
    ExpressionAttributeNames: {
      "#location": "location",
    },
  };

  /*
   const result = await dynamo.query(params).promise();
   return result.Items! as T[];
   */

  const result = await dynamo.scan(params).promise();
  const franchises = result.Items! as Franchise[];
  return franchises;
}
