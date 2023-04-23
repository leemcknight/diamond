import { DynamoDB } from "aws-sdk";
import { Ballpark } from "../types";
import { TDynamoKey, getByKey } from "./dynamoReader";

export async function getAll(): Promise<Ballpark[]> {
  const key = {
    partitionKey: "ballpark",
  } as TDynamoKey;
  const parks = getByKey<Ballpark>(key);
  return parks;
}
