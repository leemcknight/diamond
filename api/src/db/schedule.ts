import { DynamoDB } from "aws-sdk";
import { TDynamoKey, getByKey } from "./dynamoReader";
import { Schedule } from "../types/schedule";

export function getMonthlyGames(
  year: string,
  month: string
): Promise<Schedule[]> {
  const key = {
    partitionKey: `schedule-${year}${month}`,
  } as TDynamoKey;

  console.log("partitionKey: " + key.partitionKey);
  return getByKey<Schedule>(key);
}
